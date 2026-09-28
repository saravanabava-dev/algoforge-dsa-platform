import { promises as fs } from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { run, checkBinary, runTestCases } from "../shell.js";

async function isAvailable() {
  return checkBinary("gcc", "--version");
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
        "No local GCC compiler was found. Install it (e.g. `sudo apt install gcc`) on the " +
        "server running the backend.",
    };
  }

  const workDir = path.join(os.tmpdir(), `algoforge-c-${crypto.randomUUID()}`);
  await fs.mkdir(workDir, { recursive: true });
  const sourcePath = path.join(workDir, "main.c");
  const binaryPath = path.join(workDir, "main.out");

  try {
    await fs.writeFile(sourcePath, code, "utf-8");

    const compile = await run("gcc", [sourcePath, "-O2", "-o", binaryPath], { timeoutMs: 8000 });
    if (compile.code !== 0) {
      return {
        verdict: "Runtime Error",
        passedCount: 0,
        totalCount: testCases.length,
        results: [],
        systemMessage: `Compilation failed:\n${compile.stderr}`,
      };
    }

    return await runTestCases(binaryPath, [], testCases, { cwd: workDir });
  } finally {
    await fs.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

export default {
  id: "c",
  label: "C",
  extension: "c",
  isAvailable,
  execute,
};
