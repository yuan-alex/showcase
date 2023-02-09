import { createCompileTarget, getStoryComponentPaths } from "./stories.mjs";

export const vitePluginId = "virtual:@showcasejs/internal";
export const vitePluginResolvedId = "\0" + vitePluginId;

export default function showcaseStoriesPlugin() {
  return {
    name: "vite-plugin-react-showcase",
    resolveId(id: string) {
      if (id === vitePluginId) {
        return vitePluginResolvedId;
      }
    },
    async load(id: string) {
      if (id === vitePluginResolvedId) {
        const storyPaths = await getStoryComponentPaths();
        const compileTarget = createCompileTarget(storyPaths);
        return compileTarget;
      }
    },
  };
}
