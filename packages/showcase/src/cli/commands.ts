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
  await startDevServer();
};
