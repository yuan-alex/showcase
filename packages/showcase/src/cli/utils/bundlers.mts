import viteReactPlugin from "@vitejs/plugin-react";
import boxen from "boxen";
import chokidar from "chokidar";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as vite from "vite";

import { ShowcaseConfig } from "../../api/api.js";
import { showcaseLog } from "./utils.mjs";
import viteReactShowcasePlugin, {
  vitePluginResolvedId,
} from "./vite-plugin-react-showcase.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const viteDefaultConfig: vite.UserConfig = {
  root: path.join(__dirname, "../renderer"),
  cacheDir: path.resolve(process.cwd(), "node_modules/.vite"),
  server: {
    port: 6006,
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
  plugins: [viteReactPlugin(), viteReactShowcasePlugin()],
};

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
      emptyOutDir: true,
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
  showcaseLog("Building production bundle with Vite");
  vite.build(defaultConfig);
};

export const startViteServer = async (showcaseConfig?: ShowcaseConfig) => {
  const config = showcaseConfig?.bundler?.viteFinal
    ? showcaseConfig?.bundler?.viteFinal(viteDefaultConfig, {
        command: "serve",
        mode: "development",
      })
    : viteDefaultConfig;

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
    showcaseLog("Reloading stories");
    const storyModule = server.moduleGraph.getModuleById(vitePluginResolvedId);
    if (storyModule) {
      server.reloadModule(storyModule);
    }
  };

  const watcher = chokidar.watch(
    [
      path.join(process.cwd(), "src/**/*.stories.{js,jsx,ts,tsx}"),
      path.join(process.cwd(), ".showcase/**/*"),
    ],
    { ignoreInitial: true },
  );
  watcher.on("add", (path) => reloadPluginModule(path, "add"));
  watcher.on("unlink", (path) => reloadPluginModule(path, "unlink"));

  return { server };
};
