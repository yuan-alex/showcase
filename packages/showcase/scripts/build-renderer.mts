import esbuild from "esbuild";
import fsExtra from "fs-extra";
import fs from "node:fs";
import url from "node:url";

fsExtra.removeSync(
  url.fileURLToPath(new URL("../dist/renderer", import.meta.url)),
);

esbuild
  .build({
    entryPoints: [
      url.fileURLToPath(
        new URL("../src/renderer/react/vite/index.tsx", import.meta.url),
      ),
    ],
    outfile: url.fileURLToPath(
      new URL("../dist/renderer/react/vite/showcase.js", import.meta.url),
    ),
    bundle: true,
    platform: "browser",
    target: "es2015",
    format: "esm",
    logLevel: "info",
    packages: "external",
    minify: true,
  })
  .then(() => {
    fs.copyFileSync(
      new URL("../public/renderer.html", import.meta.url),
      new URL("../dist/renderer/react/vite/index.html", import.meta.url),
    );
  });
