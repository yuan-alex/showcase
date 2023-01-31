import { UserConfig } from "vite";

export interface ShowcaseConfig {
  stories?: string[];
  server?: {
    port?: number;
    host?: string;
  };
  bundler?: {
    type: "vite4";
    viteFinal?: (
      config: UserConfig,
      { command, mode }: { command: string; mode: string },
    ) => UserConfig;
  };
}

export const defineConfig = (config: ShowcaseConfig) => config;
