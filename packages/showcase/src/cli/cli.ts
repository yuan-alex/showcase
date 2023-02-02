#!/usr/bin/env node
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import { startDev } from "./commands.js";

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
    (argv) => {
      console.log(`Building showcase to ${argv.output}`);
    },
  )
  .help().argv;
