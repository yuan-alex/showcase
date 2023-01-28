import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import { startDev } from "./commands.js";

yargs(hideBin(process.argv))
  .scriptName("showcase")
  .usage("$0 <cmd> [args]")
  .command(
    "dev",
    "Run showcase in development mode",
    (yargs) => {
      return yargs.option("port", {
        alias: "p",
        type: "number",
        default: 3000,
      });
    },
    async (argv) => {
      console.log(`Running showcase in development mode on port ${argv.port}`);
      await startDev({ port: argv.port });
    },
  )
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
