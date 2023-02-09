import {
  buildVite,
  startViteServer,
  viteDefaultConfig,
} from "./utils/bundlers.mjs";
import { createSnapshots } from "./utils/snapshots.mjs";
import { getShowcaseConfig } from "./utils/utils.mjs";

export const startDev = async () => {
  const config = await getShowcaseConfig();
  await startViteServer(config);
};

export const build = async () => {
  const config = await getShowcaseConfig();
  await buildVite(config);
};

export const screenshot = async () => {
  await createSnapshots();
};
