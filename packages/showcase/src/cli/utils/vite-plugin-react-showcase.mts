import { createCompileTarget, getStoryComponentPaths } from "./stories.mjs";

export const virtualModuleId = "virtual:@showcasejs/internal";
export const resolvedVirtualModuleId = "\0" + virtualModuleId;

export default function showcaseStoriesPlugin() {
  return {
    name: "vite-plugin-react-showcase",
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const storyPaths = await getStoryComponentPaths();
        const compileTarget = createCompileTarget(storyPaths);
        return compileTarget;
      }
    },
  };
}
