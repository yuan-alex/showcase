import esbuild from "esbuild";
import fsExtra from "fs-extra";
import fs from "node:fs";
import url from "node:url";

fsExtra.removeSync(url.fileURLToPath(new URL("../dist/app", import.meta.url)));

esbuild.buildSync({
  entryPoints: [
    url.fileURLToPath(new URL("../src/app/main.tsx", import.meta.url)),
  ],
  outfile: url.fileURLToPath(
    new URL("../dist/app/showcase.tsx", import.meta.url),
  ),
  bundle: true,
  platform: "browser",
  target: "esnext",
  format: "esm",
  logLevel: "info",
  packages: "external",
});

fs.copyFileSync(
  new URL("../src/app/index.prod.html", import.meta.url),
  new URL("../dist/app/index.html", import.meta.url),
);
