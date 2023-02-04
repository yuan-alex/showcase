import viteReactPlugin from "@vitejs/plugin-react";
import boxen from "boxen";
import chokidar from "chokidar";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as vite from "vite";

import { ShowcaseConfig } from "../../api/api.js";
import { createShowcaseLog } from "./utils.mjs";
import viteReactShowcasePlugin, {
  resolvedVirtualModuleId,
} from "./vite-plugin-react-showcase.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const buildVite = async (showcaseConfig?: ShowcaseConfig) => {
  const defaultConfig: vite.UserConfig = {
    root: path.join(__dirname, "../renderer"),
    build: {
      outDir: path.join(process.cwd(), "dist/showcase"),
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
          },
        },
      },
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
    plugins: [viteReactPlugin(), viteReactShowcasePlugin()],
  };
  createShowcaseLog("Building production bundle with Vite");
  vite.build(defaultConfig);
};

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
          find: "@showcasejs/internal",
          replacement: "virtual:@showcasejs/internal",
        },
        {
          find: "@showcasejs/root",
          replacement: path.resolve(process.cwd()),
        },
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
    boxen(
      `Started Vite development server on port ${server.config.server.port}`,
      {
        padding: 1,
        title: "Showcase",
        titleAlignment: "left",
        borderColor: "green",
        borderStyle: "round",
      },
    ),
  );

  const reloadPluginModule = (path: string, event: string) => {
    createShowcaseLog("Reloading stories");
    const storyModule = server.moduleGraph.getModuleById(
      resolvedVirtualModuleId,
    );
    if (storyModule) {
      server.reloadModule(storyModule);
    }
  };
  const watcher = chokidar.watch([
    path.join(process.cwd(), "src/**/*.stories.{js,jsx,ts,tsx}"),
    path.join(process.cwd(), ".showcase/**/*"),
  ]);
  watcher.on("add", (path) => reloadPluginModule(path, "add"));
  watcher.on("unlink", (path) => reloadPluginModule(path, "unlink"));
};
