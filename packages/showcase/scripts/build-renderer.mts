import esbuild from "esbuild";
import fsExtra from "fs-extra";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

fsExtra.removeSync(fileURLToPath(new URL("../dist/renderer", import.meta.url)));

esbuild
  .build({
    entryPoints: [
      fileURLToPath(new URL("../src/renderer/index.tsx", import.meta.url)),
    ],
    outfile: fileURLToPath(
      new URL("../dist/renderer/showcase.js", import.meta.url),
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
      new URL("../public/index.html", import.meta.url),
      new URL("../dist/renderer/index.html", import.meta.url),
    );
  });
