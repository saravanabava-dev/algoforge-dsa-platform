import { spawn } from "child_process";

/**
 * Runs a child process with a hard timeout, capturing stdout/stderr.
 * Shared by every language adapter so timeout/kill behaviour is consistent.
 */
export function run(cmd, args, options = {}) {
  return new Promise((resolve) => {
    let proc;
    try {
      proc = spawn(cmd, args, { cwd: options.cwd });
    } catch (err) {
      resolve({ code: -1, stdout: "", stderr: err.message, timedOut: false });
      return;
    }

    let stdout = "";
    let stderr = "";
    let timedOut = false;

    const timeout = setTimeout(() => {
      timedOut = true;
      proc.kill("SIGKILL");
    }, options.timeoutMs || 5000);

    proc.stdout?.on("data", (d) => (stdout += d.toString()));
    proc.stderr?.on("data", (d) => (stderr += d.toString()));

    if (options.stdin !== undefined) {
      proc.stdin.write(options.stdin);
      proc.stdin.end();
    }

    proc.on("error", (err) => {
      clearTimeout(timeout);
      resolve({ code: -1, stdout, stderr: stderr + `\n[execution] ${err.message}`, timedOut: false });
    });

    proc.on("close", (code) => {
      clearTimeout(timeout);
      resolve({
        code,
        stdout,
        stderr: timedOut ? stderr + "\n[execution] Time limit exceeded" : stderr,
        timedOut,
      });
    });
  });
}

/** Checks whether a binary exists and responds to a version flag. */
export async function checkBinary(cmd, versionArg = "--version") {
  // 8s, not 4s: on loaded/constrained lab hardware, JVM cold-start for
  // `javac -version` can occasionally take longer than a short timeout,
  // which would otherwise misreport a real, installed JDK as "unavailable".
  const result = await run(cmd, [versionArg], { timeoutMs: 8000 });
  // A missing binary surfaces as a spawn error (code -1, stderr containing
  // the Node ENOENT message) — that must NOT count as "available", even
  // though the error text happens to mention the command name. Only a
  // clean process exit counts as detection; we don't guess from output.
  return result.code === 0;
}

/**
 * Runs `testCases` against a prepared (compiled or interpreted) program and
 * builds the standard verdict/results shape shared by every adapter.
 */
export async function runTestCases(execCmd, execArgs, testCases, options = {}) {
  const results = [];
  let passedCount = 0;

  for (const tc of testCases) {
    const exec = await run(execCmd, execArgs, {
      cwd: options.cwd,
      stdin: tc.input,
      timeoutMs: options.timeoutMs || 5000,
    });
    const actual = exec.stdout.trim();
    const expected = tc.expectedOutput.trim();
    const passed = exec.code === 0 && actual === expected;
    if (passed) passedCount++;

    if (!tc.hidden) {
      results.push({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: exec.code !== 0 ? (exec.stderr.trim() || "Runtime error") : actual,
        passed,
      });
    }
  }

  const verdict = passedCount === testCases.length ? "Accepted" : "Wrong Answer";
  return { verdict, passedCount, totalCount: testCases.length, results };
}
