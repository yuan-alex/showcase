import react from "@vitejs/plugin-react-swc";
import boxen from "boxen";
import express from "express";
import path from "node:path";
import url from "node:url";
import * as vite from "vite";

import { createMetaFile } from "./stories.mjs";

export const startAppServer = async () => {
  await createMetaFile();

  // this server is used to serve the app, so we don't have to bundle the entire app in dist
  const config: vite.InlineConfig = {
    root: url.fileURLToPath(new URL("../app", import.meta.url)),
    publicDir: url.fileURLToPath(new URL("../app/public", import.meta.url)),
    server: { port: 6006 },
    plugins: [react()],
  };

  const server = await vite.createServer(config);
  await server.listen();

  const app = express();
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
  app.get("/meta.json", (req, res) => {
    res.sendFile(path.join(process.cwd(), ".showcase/meta.json"));
  });
  app.listen(6008);

  console.log(boxen(`Showcase.js started on port 6006.\nGo to http://localhost:6006 to get started.`, { padding: 1 }));
};
