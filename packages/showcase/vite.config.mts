/*
  This instance of the Vite config is used for quick development testing.
  Use `pnpm vite` to start the dev server.
*/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import url from "node:url";
import showcaseStoriesPlugin from "./src/cli/utils/vite-plugin-react-showcase";

export default defineConfig({
  publicDir: url.fileURLToPath(
    new URL("./dist/renderer/public", import.meta.url),
  ),
  server: {
    port: 3000,
  },
  build: {
    outDir: url.fileURLToPath(new URL("./dist/renderer", import.meta.url)),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@showcasejs/internal/stories": path.resolve(
        process.cwd(),
        "node_modules/.cache/showcase/bundleTarget.tsx",
      ),
    },
  },
});
