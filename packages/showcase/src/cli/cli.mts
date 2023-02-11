#!/usr/bin/env node
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import { screenshot, startDev } from "./commands.mjs";
import { createMetaFile } from "./utils/stories.mjs";

yargs(hideBin(process.argv))
  .scriptName("showcase")
  .usage("$0 <cmd> [args]")
  .command("dev", "Run development server", async (argv) => {
    await startDev();
  })
  .command(
    "create-snapshots",
    "Generate snapshots of all stories",
    async (argv) => {
      await screenshot();
    },
  )
  .command(
    "create-meta",
    "Generate meta file for all stories",
    async (argv) => {
      await createMetaFile();
    },
  )
  .help().argv;
