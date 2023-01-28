import path from "node:path";
import fs from "fs-extra";
import url from "node:url";

export const configPath = path.resolve(process.cwd(), ".showcase/config.js");
export const configUrl = url.pathToFileURL(configPath).toString();

interface ShowcaseConfig {
  bundler?: {
    type?: "webpack5" | "webpack4" | "vite4" | "parcel2";
    configFinal?: (
      config: any,
      { command, mode }: { command: string; mode: string },
    ) => any;
  };
}

export const getShowcaseConfig = async () => {
  if (!fs.existsSync(configPath)) {
    return null;
  }
  const config = await import(configUrl);
  return config.default as ShowcaseConfig;
};
