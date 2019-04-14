import { paths } from "../service/path";
import { dinamycRequire } from "../service/utils";

export const loaders = {
  ts: {
    loader: dinamycRequire.resolve("ts-loader"),
    options: {
      context: paths.root,
      transpileOnly: true,
      experimentalWatchApi: true
    }
  }
};
