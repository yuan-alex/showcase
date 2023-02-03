#!/usr/bin/env node
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import { build, startDev } from "./commands.mjs";

yargs(hideBin(process.argv))
  .scriptName("showcase")
  .usage("$0 <cmd> [args]")
  .command("dev", "Run showcase in development mode", async (argv) => {
    await startDev();
  })
  .command(
    "build",
    "Build static production showcase instance",
    (yargs) => {
      yargs.option("output", {
        alias: "o",
        type: "string",
        default: ".showcase/dist",
      });
    },
    async (argv) => {
      await build();
    },
  )
  .help().argv;
