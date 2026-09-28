// Wires the Code Lab's editor to a fully local, bundled copy of Monaco.
//
// IMPORTANT: @monaco-editor/react defaults to fetching Monaco's runtime from
// a public CDN (jsdelivr) on first mount. That would silently break this
// platform's offline-first requirement — it would work in development (with
// internet) and then fail inside an offline college lab. This file points
// the loader at the `monaco-editor` package that's bundled with the app
// instead, and registers Monaco's web worker locally via Vite's `?worker`
// import syntax so language services (bracket matching, basic validation)
// also never reach the network.
import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

self.MonacoEnvironment = {
  getWorker() {
    // A single generic worker covers editing/bracket-matching for every
    // language we support (Java/Python/C/C++/JS use Monaco's built-in
    // Monarch tokenizers, which are syntax-highlighting-only and don't need
    // their own dedicated workers the way TypeScript's language service does).
    return new EditorWorker();
  },
};

loader.config({ monaco });
