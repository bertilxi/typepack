import { paths } from "../service/path";
import { dynamicRequire } from "../service/utils";
import { store } from "../service/store";
import { RuleSetLoader } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type RuleSetLoaderGetter = () => RuleSetLoader;
interface LoaderMap {
  ts: RuleSetLoaderGetter;
  html: RuleSetLoaderGetter;
  style: RuleSetLoaderGetter;
  css: RuleSetLoaderGetter;
  postcss: RuleSetLoaderGetter;
}

export const loaders: LoaderMap = {
  ts: () => ({
    loader: dynamicRequire.resolve("ts-loader"),
    options: {
      context: paths.root,
      transpileOnly: true,
      experimentalWatchApi: true
    }
  }),
  html: () => {
    const { env } = store.getState();
    const isDev = env !== "production";

    return {
      loader: dynamicRequire.resolve("html-loader"),
      options: {
        minimize: !isDev
      }
    };
  },
  style: () => {
    const { env } = store.getState();
    const isDev = env !== "production";

    return {
      loader: isDev
        ? dynamicRequire.resolve("style-loader")
        : MiniCssExtractPlugin.loader
    };
  },
  css: () => {
    const { env } = store.getState();
    const isDev = env !== "production";

    return {
      loader: dynamicRequire.resolve("css-loader"),
      options: { sourceMap: !isDev, importLoaders: 1 }
    };
  },
  postcss: () => {
    const { env } = store.getState();
    const isDev = env !== "production";

    return {
      loader: dynamicRequire.resolve("postcss-loader"),
      options: { sourceMap: !isDev, plugins: [dynamicRequire("autoprefixer")] }
    };
  }
};
