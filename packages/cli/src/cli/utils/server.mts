import react from "@vitejs/plugin-react-swc";
import boxen from "boxen";
import url from "node:url";
import * as vite from "vite";

import { createMetaFile } from "./stories.mjs";
import showcaseStoriesPlugin from "./vite-plugin-react-showcase.mjs";
import { getDefaultViteConfig } from "./vite.mjs";

const startAppServer = async () => {
  const defaultConfig = getDefaultViteConfig();

  // this server is used to serve the app, so we don't have to bundle the entire app in dist
  const config: vite.InlineConfig = {
    ...defaultConfig,
    root: url.fileURLToPath(new URL("../app", import.meta.url)),
    publicDir: url.fileURLToPath(new URL("../app/public", import.meta.url)),
    server: { port: 6006 },
    plugins: [showcaseStoriesPlugin(), react()],
  };

  const server = await vite.createServer(config);
  await server.listen();
};

export const startServers = async () => {
  await createMetaFile();
  await startAppServer();
  console.log(
    boxen(
      `Showcase.js started on port 6006.\nGo to http://localhost:6006 to get started.`,
      { padding: 1 },
    ),
  );
};
