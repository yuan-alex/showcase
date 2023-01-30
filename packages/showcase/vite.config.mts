import react from "@vitejs/plugin-react";
import path from "node:path";
import url from "node:url";
import { defineConfig } from "vite";

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
  resolve: {
    alias: [
      {
        find: "@showcasejs/internal/stories",
        replacement: "virtual:@showcasejs/internal/stories",
      },
      { find: "@", replacement: path.resolve(process.cwd()) },
    ],
  },
  plugins: [react(), showcaseStoriesPlugin()],
});
