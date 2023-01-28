import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import url from "node:url";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    outDir: url.fileURLToPath(new URL("./dist/renderer", import.meta.url)),
    rollupOptions: {},
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@showcase/internal/stories": path.resolve(
        process.cwd(),
        "node_modules/.cache/showcase/bundleTarget.tsx",
      ),
    },
  },
});
