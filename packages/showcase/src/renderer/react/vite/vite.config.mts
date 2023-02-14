import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import url from "node:url";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";

import showcaseStoriesPlugin from "../../../cli/utils/vite-plugin-react-showcase.mjs";

export default defineConfig({
  cacheDir: path.join(
    process.cwd(),
    "node_modules/.cache/showcase/renderer/vite",
  ),
  publicDir: url.fileURLToPath(new URL("./public", import.meta.url)),
  server: {
    port: 6007,
  },
  resolve: {
    alias: [
      {
        find: "@showcasejs/internal",
        replacement: "virtual:@showcasejs/internal",
      },
      {
        find: "@showcasejs/root",
        replacement: path.resolve(process.cwd()),
      },
    ],
  },
  plugins: [Inspect(), react(), showcaseStoriesPlugin()],
});
