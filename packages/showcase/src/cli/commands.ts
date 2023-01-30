import { startViteServer } from "./utils/bundlers.js";
import { createShowcaseLog, getShowcaseConfig } from "./utils/utils.js";

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
