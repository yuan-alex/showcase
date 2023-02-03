import { startViteServer } from "./utils/bundlers.mjs";
import { createShowcaseLog, getShowcaseConfig } from "./utils/utils.mjs";

export const startDev = async () => {
  const config = await getShowcaseConfig();
  switch (config?.bundler?.type) {
    case "vite4":
      await startViteServer(config);
      break;
    default:
      createShowcaseLog("No bundler specified, using Vite as default.");
      await startViteServer(config);
      break;
  }
};