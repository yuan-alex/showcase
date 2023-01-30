import viteReactPlugin from "@vitejs/plugin-react";
import boxen from "boxen";
import chokidar from "chokidar";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as vite from "vite";

import { ShowcaseConfig } from "../../api/api.js";
import viteReactShowcasePlugin, {
  resolvedVirtualModuleId,
} from "./vite-plugin-react-showcase.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const startViteServer = async (showcaseConfig?: ShowcaseConfig) => {
  const defaultConfig: vite.UserConfig = {
    root: path.join(__dirname, "../renderer"),
    cacheDir: path.resolve(process.cwd(), "node_modules/.vite"),
    server: {
      port: showcaseConfig?.server?.port || 3000,
      host: showcaseConfig?.server?.host || "localhost",
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

  const config = showcaseConfig?.bundler?.viteFinal
    ? showcaseConfig?.bundler?.viteFinal(defaultConfig, {
        command: "serve",
        mode: "development",
      })
    : defaultConfig;

  const server = await vite.createServer(config);
  await server.listen();

  console.log(
    boxen(`Started server on port ${server.config.server.port}`, {
      padding: 1,
      title: "Showcase",
      titleAlignment: "left",
      borderColor: "blue",
      borderStyle: "round",
    }),
  );

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
