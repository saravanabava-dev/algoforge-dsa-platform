import { promises as fs } from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { run, checkBinary, runTestCases } from "../shell.js";

function extractPublicClassName(code) {
  const match = code.match(/public\s+class\s+(\w+)/);
  return match ? match[1] : "Main";
}

async function isAvailable() {
  return checkBinary("javac", "-version");
}

async function execute(code, testCases) {
  const available = await isAvailable();
  if (!available) {
    return {
      verdict: "Runtime Error",
      passedCount: 0,
      totalCount: testCases.length,
      results: [],
      systemMessage:
        "No local JDK (javac) was found on this machine. Install one (e.g. `sudo apt install " +
        "default-jdk`) on the server running the backend. This platform never sends code to an " +
        "external execution service.",
    };
  }

  const className = extractPublicClassName(code);
  const workDir = path.join(os.tmpdir(), `algoforge-java-${crypto.randomUUID()}`);
  await fs.mkdir(workDir, { recursive: true });
  const filePath = path.join(workDir, `${className}.java`);

  try {
    await fs.writeFile(filePath, code, "utf-8");

    const compile = await run("javac", [filePath], { timeoutMs: 8000 });
    if (compile.code !== 0) {
      return {
        verdict: "Runtime Error",
        passedCount: 0,
        totalCount: testCases.length,
        results: [],
        systemMessage: `Compilation failed:\n${compile.stderr}`,
      };
    }

    return await runTestCases("java", ["-cp", workDir, className], testCases, { cwd: workDir });
  } finally {
    await fs.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

export default {
  id: "java",
  label: "Java",
  extension: "java",
  isAvailable,
  execute,
};
