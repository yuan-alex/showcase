import esbuild from "esbuild";
import fs from "fs-extra";
import { globby } from "globby";
import handlebars from "handlebars";
import path from "node:path";

interface StoryPathsObject {
  [storyId: string]: {
    path: string;
  };
}

export const getStoryComponentPaths = async (): Promise<StoryPathsObject> => {
  const paths = await globby(["src/**/*.stories.tsx"]);

  let pathsObject: StoryPathsObject = {};

  paths.forEach((path) => {
    const id = path.split("/").slice(-1)[0].split(".")[0];
    if (pathsObject[id]) {
      throw new Error(`Duplicate story file name found: ${path}`);
    }
    pathsObject[id] = { path: path };
  });
  return pathsObject;
};

export const createCompileTarget = (storyPaths: StoryPathsObject) => {
  const imports = Object.keys(storyPaths).map((componentName) => ({
    name: componentName,
    path: `@/${storyPaths[componentName].path}`,
  }));
  const componentNames = Object.keys(storyPaths).map((storyId) => storyId);
  const template = handlebars.compile(
    fs.readFileSync(
      new URL("./storyTargetTemplate.hbs", import.meta.url),
      "utf-8",
    ),
  );
  const compiled = template({
    timestamp: new Date().toISOString(),
    imports,
    componentNames,
  });
  const compiledJs = esbuild.transformSync(compiled, {
    format: "esm",
    loader: "tsx",
  }).code;
  fs.outputFileSync(
    path.resolve(
      process.cwd(),
      "node_modules/.cache/showcase/bundleTarget.tsx",
    ),
    compiledJs,
  );
  return compiledJs;
};
