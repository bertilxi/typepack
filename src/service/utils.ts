/* eslint-disable @typescript-eslint/camelcase */
import { existsSync } from "fs";
import { join } from "path";
import { Entry } from "webpack";

import { paths } from "./path";
import { store } from "./store";

declare const __webpack_require__;
declare const __non_webpack_require__;
export const dynamicRequire =
  typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;

export const getUserConfig = () => {
  const userConfigPath = join(paths.root, "./typepack.ts");
  const exist = existsSync(userConfigPath);
  return exist ? dynamicRequire(userConfigPath) : {};
};

export const loadUserConfig = () => {
  let userConfig = getUserConfig() || {};
  userConfig = userConfig.default || userConfig;

  store.setState(userConfig);
};

export const resolveHtmlTemplate = () => {
  const { htmlTemplate } = store.getState();
  const filePaths = htmlTemplate
    ? [htmlTemplate]
    : ["./src/index.html", "./assets/index.html", "./index.html"];

  for (const file of filePaths) {
    const path = join(paths.root, file);
    if (existsSync(path)) {
      return path;
    }
  }
};

export const makeDevEntry = (entry: string) => {
  const { port } = store.getState();
  return [
    require.resolve("webpack-dev-server/client") + `?http://localhost:${port}`,
    require.resolve("webpack/hot/dev-server"),
    entry
  ];
};

export const makeDevEntries = (entries: Entry) => {
  Object.keys(entries).forEach(entryKey => {
    const entry = entries[entryKey];
    if (typeof entry !== "string") {
      return;
    }
    entries[entryKey] = makeDevEntry(entry);
  });
  return entries;
};
