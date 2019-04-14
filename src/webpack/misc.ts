import { paths } from "../service/path";
import { Options, Output } from "webpack";
import { plugins } from "./plugins";
import { store } from "../service/store";

export const output = (isNode: boolean): Output => {
  return isNode
    ? {
        filename: "index.js",
        path: paths.output,
        libraryTarget: "commonjs2"
      }
    : {};
};

export const optimization = (isDev: boolean): Options.Optimization => {
  const { sourceMaps } = store.getState();

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
