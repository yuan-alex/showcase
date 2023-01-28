import chokidar from "chokidar";
import path from "node:path";

import { startDevServer } from "./utils/bundlers.js";
import {
  createCompileTarget,
  getStoryComponentPaths,
} from "./utils/stories.js";

interface DevConfig {
  port: number;
}

export const startDev = async (config: DevConfig) => {
  const storyPaths = await getStoryComponentPaths();
  const watcher = chokidar.watch(path.join(process.cwd(), "src"));
  createCompileTarget(storyPaths);
  watcher.on("change", async (path) => {
    console.log(`Detected change to ${path}`);
    createCompileTarget(storyPaths);
  });
  await startDevServer();
};
