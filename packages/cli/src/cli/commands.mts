import { createSnapshots } from "./utils/snapshots.mjs";
import { getShowcaseConfig } from "./utils/utils.mjs";
import {
  buildViteRenderingServer,
  startViteRenderingServer,
} from "./utils/vite.mjs";

export const startDev = async () => {
  const config = await getShowcaseConfig();
  await startViteRenderingServer(config);
};

export const build = async () => {
  await buildViteRenderingServer();
};

export const screenshot = async () => {
  await createSnapshots();
};
