import { promises as fs } from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { checkBinary, runTestCases } from "../shell.js";

async function isAvailable() {
  return checkBinary("node", "--version");
}

// Student code reads test input via a synchronous stdin read helper we
// inject, since Node doesn't make blocking stdin trivial by default. We
// prepend a small shim exposing `readLine()`/`readAll()` so student code can
// be written in a simple, synchronous style consistent with the other
// languages' templates.
const STDIN_SHIM = `
const fs = require('fs');
const __input = fs.readFileSync(0, 'utf-8').split('\\n');
let __lineIndex = 0;
function readLine() { return __input[__lineIndex++] ?? ''; }
function readAll() { return __input.join('\\n'); }
`;

async function execute(code, testCases) {
  const available = await isAvailable();
  if (!available) {
    return {
      verdict: "Runtime Error",
      passedCount: 0,
      totalCount: testCases.length,
      results: [],
      systemMessage:
        "No local Node.js runtime was found. Install Node.js on the server running the backend.",
    };
  }

  const workDir = path.join(os.tmpdir(), `algoforge-js-${crypto.randomUUID()}`);
  await fs.mkdir(workDir, { recursive: true });
  const filePath = path.join(workDir, "main.js");

  try {
    await fs.writeFile(filePath, STDIN_SHIM + "\n" + code, "utf-8");
    return await runTestCases("node", [filePath], testCases, { cwd: workDir });
  } finally {
    await fs.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

export default {
  id: "javascript",
  label: "JavaScript",
  extension: "js",
  isAvailable,
  execute,
};
