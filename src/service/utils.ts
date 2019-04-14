/* eslint-disable @typescript-eslint/camelcase */
import { paths } from "./path";
import { join } from "path";
import { existsSync } from "fs";
import { store } from "./store";

declare const __webpack_require__;
declare const __non_webpack_require__;
export const dinamycRequire =
  typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;

export const getUserConfig = () => {
  const userConfigPath = join(paths.root, "./typepack.ts");
  const exist = existsSync(userConfigPath);
  return exist ? dinamycRequire(userConfigPath) : {};
};

export const loadUserConfig = () => {
  let userConfig = getUserConfig() || {};
  userConfig = userConfig.default || userConfig;

  store.setState(userConfig);
};
