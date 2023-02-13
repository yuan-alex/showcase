import { defineConfig } from "vite";

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
  cacheDir: "node_modules/.cache/showcase/app/vite",
  server: {
    port: 6006,
  },
  plugins: [injectTailwindCDN()],
});
