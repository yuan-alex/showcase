import fsExtra from "fs-extra";
import path from "node:path";
import * as playwright from "playwright";
import * as vite from "vite";

import { viteDefaultConfig } from "./bundlers.mjs";
import { createMetaFile } from "./stories.mjs";
import { showcaseLog } from "./utils.mjs";

export const createSnapshots = async () => {
  fsExtra.removeSync(path.join(process.cwd(), ".showcase/snapshots"));

  const meta = await createMetaFile();

  showcaseLog(`🚀 Starting Vite server for snapshotting`);
  const server = await vite.createServer(viteDefaultConfig);
  server.listen();

  showcaseLog(`📸 Creating snapshots for chromium`);

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  for (const componentName of Object.keys(meta.components)) {
    for (const storyName of meta.components[componentName].stories) {
      await page.goto(
        `${server.config.server.host}:${server.config.server.port}/stories/${componentName}--${storyName}/preview`,
      );
      await page.screenshot({
        path: path.join(
          process.cwd(),
          `.showcase/snapshots/${componentName}/${storyName}/chromium.png`,
        ),
        fullPage: true,
      });
    }
  }
  await browser.close();
  await server.close();

  const snapshotCount = Object.keys(meta.components).length;
  showcaseLog(
    `✨ Created ${snapshotCount} ${
      snapshotCount === 1 ? "snapshot" : "snapshots"
    } in .showcase/snapshots`,
  );
};
