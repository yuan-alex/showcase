import { startViteRenderingServer } from "./utils/bundlers.mjs";
import { createSnapshots } from "./utils/snapshots.mjs";
import { getShowcaseConfig } from "./utils/utils.mjs";

export const startDev = async () => {
  const config = await getShowcaseConfig();
  await startViteRenderingServer(config);
};

export const screenshot = async () => {
  await createSnapshots();
};
