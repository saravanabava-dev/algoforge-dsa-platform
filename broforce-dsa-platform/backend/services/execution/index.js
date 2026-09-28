import java from "./adapters/java.js";
import python from "./adapters/python.js";
import c from "./adapters/c.js";
import cpp from "./adapters/cpp.js";
import javascript from "./adapters/javascript.js";

// Central registry. Adding a new language means writing one adapter file
// (see adapters/python.js for the simplest example, adapters/cpp.js for a
// compiled-language example) and registering it here — nothing else in the
// codebase needs to change (routes, controllers, and the frontend Problem
// model are all language-agnostic).
export const ADAPTERS = {
  java,
  python,
  c,
  cpp,
  javascript,
};

export const SUPPORTED_LANGUAGES = Object.values(ADAPTERS).map((a) => ({
  id: a.id,
  label: a.label,
  extension: a.extension,
}));

export async function runSubmission(languageId, code, testCases) {
  const adapter = ADAPTERS[languageId];
  if (!adapter) {
    return {
      verdict: "Runtime Error",
      passedCount: 0,
      totalCount: testCases.length,
      results: [],
      systemMessage: `Unsupported language: ${languageId}`,
    };
  }
  return adapter.execute(code, testCases);
}

// Used by the Admin "Runtime Status" panel — checks every language's
// compiler/interpreter availability on the machine running the backend, so
// staff can see at a glance what students can actually run before a lab
// session, without pretending a missing runtime works.
export async function getRuntimeStatus() {
  const entries = await Promise.all(
    Object.values(ADAPTERS).map(async (adapter) => ({
      id: adapter.id,
      label: adapter.label,
      available: await adapter.isAvailable(),
    }))
  );
  return entries;
}
