import { Options, Output, RuleSetRule } from "webpack";

import { paths } from "../service/path";
import { store } from "../service/store";
import { makeDevEntries } from "../service/utils";
import { plugins } from "./plugins";
import { rules } from "./rules";

export const devtool = (): Options.Devtool => {
  const { env, sourceMaps } = store.getState();
  const isDev = env !== "production";

  return sourceMaps
    ? isDev
      ? "cheap-module-eval-source-map"
      : "source-map"
    : false;
};

export const output = (): Output => {
  const { env, mode } = store.getState();
  const isDev = env !== "production";
  const isNode = mode && mode === "node";

  return isNode
    ? {
        filename: "index.js",
        path: paths.output,
        libraryTarget: "commonjs2"
      }
    : {
        publicPath: "/",
        filename: isDev ? "js/[name].js" : "js/[name].[chunkhash].js",
        chunkFilename: isDev ? "js/[id].js" : "js/[id].[chunkhash].js",
        path: paths.output,
        libraryTarget: "umd",
        pathinfo: false
      };
};

export const optimization = (): Options.Optimization => {
  const { env, sourceMaps } = store.getState();
  const isDev = env !== "production";

  return isDev
    ? {}
    : {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        minimizer: [
          plugins.terser({
            cache: true,
            parallel: true,
            sourceMap: !!sourceMaps,
            terserOptions: {
              mangle: true,
              compress: true,
              output: {
                comments: false
              }
            }
          })
        ],
        splitChunks: {
          chunks: "all"
        }
      };
};

export const oneOfRules = (): RuleSetRule[] => {
  const { mode } = store.getState();
  const isNode = mode && mode === "node";

  return isNode
    ? [rules.ts]
    : [
        rules.ts,
        rules.html,
        rules.styles,
        rules.fonts,
        rules.images,
        rules.media
      ];
};

export const entry = () => {
  const { env, mode } = store.getState();
  const isDev = env !== "production";
  const isNode = mode && mode === "node";

  if (!isNode && isDev) {
    return makeDevEntries(paths.entry);
  }
  return paths.entry;
};
