import chalk from "chalk";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import { ShowcaseConfig } from "../../api/api.js";

export const configPath = path.resolve(process.cwd(), ".showcase/config.js");
export const configUrl = url.pathToFileURL(configPath).toString();

export const getShowcaseConfig = async () => {
  if (!fs.existsSync(configPath)) {
    return undefined;
  }
  const config = await import(configUrl);
  return config?.default as ShowcaseConfig | undefined;
};

export const showcaseLog = (log: string) => {
  console.log(`${chalk.blue.bold("[showcase]")} ${log}`);
};
