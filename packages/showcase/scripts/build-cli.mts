import esbuild from "esbuild";
import fsExtra from "fs-extra";
import fs from "node:fs";
import { fileURLToPath } from "node:url";


fsExtra.removeSync(fileURLToPath(new URL("../dist/cli", import.meta.url)));

esbuild.buildSync({
  entryPoints: [fileURLToPath(new URL("../src/cli/cli.ts", import.meta.url))],
  outfile: fileURLToPath(new URL("../dist/cli/main.js", import.meta.url)),
  bundle: true,
  platform: "node",
  target: "node14.16",
  format: "esm",
  packages: "external",
  logLevel: "info",
});

fs.copyFileSync(
  new URL("../src/cli/utils/storyTargetTemplate.hbs", import.meta.url),
  new URL("../dist/cli/storyTargetTemplate.hbs", import.meta.url),
);
