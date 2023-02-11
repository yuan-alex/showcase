import chokidar from "chokidar";
import { globby, globbySync } from "globby";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as vite from "vite";

import { ShowcaseConfig } from "../../api/api.js";
import { startAppServer } from "./server.mjs";
import { createMetaFile } from "./stories.mjs";
import { showcaseLog } from "./utils.mjs";
import viteReactShowcasePlugin, {
  vitePluginResolvedId,
} from "./vite-plugin-react-showcase.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getViteConfig = (): vite.InlineConfig => {
  const viteUserConfig = globbySync("vite.config.{js,ts,mjs,cjs}");
  const configFile = viteUserConfig.length > 0 ? viteUserConfig[0] : undefined;
  return {
    configFile,
    root: path.join(__dirname, "../renderer/react/vite"),
    publicDir: path.join(process.cwd(), "public"),
    server: {
      port: 6007,
      host: "localhost",
    },
    resolve: {
      alias: [
        {
          find: "@showcasejs/internal",
          replacement: "virtual:@showcasejs/internal",
        },
        {
          find: "@showcasejs/root",
          replacement: path.resolve(process.cwd()),
        },
      ],
    },
    plugins: [viteReactShowcasePlugin()],
  };
};

export const startViteRenderingServer = async (
  showcaseConfig?: ShowcaseConfig,
) => {
  const config = showcaseConfig?.bundler?.viteFinal
    ? showcaseConfig?.bundler?.viteFinal(getViteConfig(), {
        command: "serve",
        mode: "development",
      })
    : getViteConfig();

  await startAppServer();

  const renderingServer = await vite.createServer(config);
  await renderingServer.listen();

  const reloadPluginModule = (path: string, event: string) => {
    createMetaFile().then(() => {
      showcaseLog("Reloading stories");
      const storyModule =
        renderingServer.moduleGraph.getModuleById(vitePluginResolvedId);
      if (storyModule) {
        renderingServer.reloadModule(storyModule);
      }
    });
  };

  const watcher = chokidar.watch(
    [
      ...(showcaseConfig?.stories?.map((s) => path.join(process.cwd(), s)) ?? [
        "src/**/*.stories.{js,jsx,ts,tsx}",
      ]),
      path.join(process.cwd(), ".showcase/**/*"),
    ],
    { ignoreInitial: true },
  );
  watcher.on("add", (path) => reloadPluginModule(path, "add"));
  watcher.on("unlink", (path) => reloadPluginModule(path, "unlink"));

  return { renderingServer };
};
