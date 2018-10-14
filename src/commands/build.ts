import configuration from "../config";
import * as webpack from "webpack";
import { getUserConfig } from "../utils";

const startWebpack = (env, opts) => {
  const userConfig = getUserConfig();
  const config = configuration(env, userConfig, opts.d);
  config.mode = env;
  webpack(config, error => {
    if (error) {
      console.error(error);
      return;
    }
  });
};

module.exports = opts => {
  process.env.NODE_ENV = "production";
  if (opts.dev) {
    process.env.NODE_ENV = "development";
  }
  if (opts.analyze) {
    process.env.BUNDLE_ANALYZE = "true";
  }
  if (opts.smp) {
    process.env.SMP = "true";
  }
  startWebpack(process.env.NODE_ENV, opts);
};
