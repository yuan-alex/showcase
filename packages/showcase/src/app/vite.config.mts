import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";

import showcaseStoriesPlugin from "../cli/utils/vite-plugin-react-showcase.mjs";

const injectTailwindCDN = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html: string) {
      return html.replace(
        /<\/head>/,
        `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" integrity="sha384-HtMZLkYo+pR5/u7zCzXxMJP6QoNnQJt1qkHM0EaOPvGDIzaVZbmYr/TlvUZ/sKAg" crossorigin="anonymous"></head>`,
      );
    },
  };
};

export default defineConfig({
  cacheDir: path.join(process.cwd(), "node_modules/.cache/showcase/app/vite"),
  server: {
    port: 6006,
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
  plugins: [injectTailwindCDN(), showcaseStoriesPlugin(), react()],
});
