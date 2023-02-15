import { UserConfig } from "vite";

export interface ShowcaseConfig {
  stories?: string[];
  server?: {
    port?: number;
    host?: string;
  };
  build?: {
    outDir?: string;
  };
  bundler?: {
    viteFinal?: (
      config: UserConfig,
      { command, mode }: { command: string; mode: string },
    ) => UserConfig;
  };
}
