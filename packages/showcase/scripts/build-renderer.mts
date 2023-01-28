import { fileURLToPath } from "node:url";
import fs from "node:fs";
import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: [
      fileURLToPath(new URL("../src/renderer/index.tsx", import.meta.url)),
    ],
    outfile: fileURLToPath(
      new URL("../dist/renderer/main.js", import.meta.url),
    ),
    bundle: true,
    platform: "browser",
    target: "es2016",
    format: "esm",
    logLevel: "info",
    packages: "external",
  })
  .then(() => {
    fs.copyFileSync(
      new URL("../public/index.html", import.meta.url),
      new URL("../dist/renderer/index.html", import.meta.url),
    );
  });
