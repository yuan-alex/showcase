import viteReactPlugin from "@vitejs/plugin-react";
import chalk from "chalk";
import chokidar from "chokidar";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as vite from "vite";

import { getShowcaseConfig } from "./utils.js";
import viteReactShowcasePlugin, {
  resolvedVirtualModuleId,
} from "./vite-plugin-react-showcase.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const startDevServer = async () => {
  const config = await getShowcaseConfig();
  switch (config?.bundler?.type) {
    case "webpack5":
      console.log("Webpack 5 is not supported yet.");
      break;
    case "webpack4":
      console.log("Webpack 4 is not supported yet.");
      break;
    case "vite4":
      await startViteServer(config);
      break;
    default:
      console.log("No bundler specified, using Vite as default.");
      await startViteServer(config);
      break;
  }
};

const bundleTargetPath = path.resolve(
  process.cwd(),
  "node_modules/.cache/showcase/bundleTarget.tsx",
);

const startViteServer = async (showcaseConfig: any) => {
  console.log("Starting Vite dev server...");
  const defaultConfig: vite.UserConfig = {
    root: path.join(__dirname, "../renderer"),
    cacheDir: path.resolve(process.cwd(), "node_modules/.vite"),
    server: {
      port: 3000,
    },
    resolve: {
      alias: [
        {
          find: "@showcasejs/internal/stories",
          replacement: "virtual:@showcasejs/internal/stories",
        },
        { find: "@", replacement: path.resolve(process.cwd()) },
      ],
    },
    plugins: [viteReactPlugin(), viteReactShowcasePlugin()],
  };
  const config = showcaseConfig?.bundler?.configFinal
    ? await showcaseConfig?.bundler?.configFinal(defaultConfig, {
        command: "serve",
        mode: "development",
      })
    : defaultConfig;
  const server = await vite.createServer(config);
  await server.listen();
  server.printUrls();

  const storyFileCreateOrDeleteCallback = (path: string, event: string) => {
    const storyModule = server.moduleGraph.getModuleById(
      resolvedVirtualModuleId,
    );
    if (storyModule) {
      server.reloadModule(storyModule);
    }
  };

  const watcher = chokidar.watch(path.join(process.cwd(), "**/*.stories.*"));
  watcher.on("add", (path) => storyFileCreateOrDeleteCallback(path, "add"));
  watcher.on("unlink", (path) =>
    storyFileCreateOrDeleteCallback(path, "unlink"),
  );
};
