import { readTextFile, exists, BaseDirectory } from "@tauri-apps/api/fs";
import { homeDir } from "@tauri-apps/api/path";

import { Config } from "../types/types";

export const loadConfig = async (): Promise<Config | null> => {
  const homePath = await homeDir();
  const configFilePath = `${homePath}.config/Flanker/config.json`;

  if (await exists(configFilePath, { dir: BaseDirectory.Home })) {
    const config = JSON.parse(
      await readTextFile(configFilePath, { dir: BaseDirectory.Home })
    ) as Config;
    return config;
  } else {
    console.error(`コンフィグファイルが見つかりません: ${configFilePath}`);
    return null;
  }
};
