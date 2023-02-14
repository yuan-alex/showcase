import chokidar from "chokidar";
import { globbySync } from "globby";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as vite from "vite";

import { ShowcaseConfig } from "../../api/api.js";
import { startServers } from "./server.mjs";
import { createMetaFile } from "./stories.mjs";
import { getShowcaseConfig, showcaseLog } from "./utils.mjs";
import viteReactShowcasePlugin, {
  vitePluginResolvedId,
} from "./vite-plugin-react-showcase.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getDefaultViteConfig = (): vite.InlineConfig => {
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

export const getCustomizedViteConfig = async () => {
  const showcaseConfig = await getShowcaseConfig();
  const config = showcaseConfig?.bundler?.viteFinal
    ? showcaseConfig?.bundler?.viteFinal(getDefaultViteConfig(), {
        command: "serve",
        mode: "development",
      })
    : getDefaultViteConfig();
  return config;
};

export const startViteRenderingServer = async (
  showcaseConfig?: ShowcaseConfig,
) => {
  const config = await getCustomizedViteConfig();
  await startServers();

  const renderingServer = await vite.createServer(config);
  await renderingServer.listen();

  const reloadPluginModule = (path: string, event: string) => {
    createMetaFile().then(() => {
      showcaseLog("🔄 Reloading stories");
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

export const buildViteRenderingServer = async () => {
  const showcaseConfig = await getShowcaseConfig();
  const outDir = path.join(
    process.cwd(),
    showcaseConfig?.build?.outDir ?? "dist/showcase",
  );

  const appConfig = {
    ...(await getDefaultViteConfig()),
    mode: "production",
    root: path.join(__dirname, "../app"),
    build: {
      outDir,
      emptyOutDir: true,
    },
  };
  showcaseLog("⚙️ Building app");
  await vite.build(appConfig);

  const rendererConfig: vite.InlineConfig = {
    ...(await getCustomizedViteConfig()),
    mode: "production",
    root: path.join(__dirname, "../renderer/react/vite"),
    base: "/render",
    build: {
      outDir: outDir + "/render",
      emptyOutDir: true,
    },
  };
  showcaseLog("⚙️ Building renderer");
  await vite.build(rendererConfig);
  showcaseLog("✅ Done building");
};
