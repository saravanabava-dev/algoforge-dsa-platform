import { promises as fs } from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { run, checkBinary, runTestCases } from "../shell.js";

// Prefer python3 (the standard on Linux); fall back to `python` (common on Windows).
let cachedBinary = null;

async function resolveBinary() {
  if (cachedBinary) return cachedBinary;
  if (await checkBinary("python3", "--version")) {
    cachedBinary = "python3";
  } else if (await checkBinary("python", "--version")) {
    cachedBinary = "python";
  } else {
    cachedBinary = null;
  }
  return cachedBinary;
}

async function isAvailable() {
  return (await resolveBinary()) !== null;
}

async function execute(code, testCases) {
  const binary = await resolveBinary();
  if (!binary) {
    return {
      verdict: "Runtime Error",
      passedCount: 0,
      totalCount: testCases.length,
      results: [],
      systemMessage:
        "No local Python interpreter was found. Install Python 3 (e.g. `sudo apt install " +
        "python3`) on the server running the backend.",
    };
  }

  const workDir = path.join(os.tmpdir(), `algoforge-py-${crypto.randomUUID()}`);
  await fs.mkdir(workDir, { recursive: true });
  const filePath = path.join(workDir, "main.py");

  try {
    await fs.writeFile(filePath, code, "utf-8");
    return await runTestCases(binary, [filePath], testCases, { cwd: workDir });
  } finally {
    await fs.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

export default {
  id: "python",
  label: "Python",
  extension: "py",
  isAvailable,
  execute,
};
