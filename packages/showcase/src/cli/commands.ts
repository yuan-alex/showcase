import { startDevServer } from "./utils/bundlers.js";

interface DevConfig {
  port: number;
}

export const startDev = async (config: DevConfig) => {
  await startDevServer();
};
