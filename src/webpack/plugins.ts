import CleanWebpackPlugin from "clean-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import NodemonPlugin from "nodemon-webpack-plugin";
import { join } from "path";
import TerserPlugin from "terser-webpack-plugin";
import webpack, { Plugin } from "webpack";
import nodeExternals from "webpack-node-externals";
import WebpackBar from "webpackbar";

import { paths } from "../service/path";
import { store } from "../service/store";
import { resolveHtmlTemplate } from "../service/utils";

export const plugins = {
  nodeExternals,
  friendlyErrors: () => new FriendlyErrorsWebpackPlugin(),
  clean: () => new CleanWebpackPlugin(),
  nodemon: () =>
    new NodemonPlugin({
      script: join(paths.root, "./dist/index.js"),
      watch: join(paths.root, "./dist/**/*")
    }),
  terser: options => new TerserPlugin(options),
  webpackbar: () =>
    new WebpackBar({
      name: "Typepack",
      color: "#0052cc"
    }),
  hmr: () => new webpack.HotModuleReplacementPlugin(),
  html: () =>
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolveHtmlTemplate(),
      inject: true
    })
};

export const loadPlugins = () => {
  const { env, mode } = store.getState();
  const isDev = env !== "production";
  const isNode = mode && mode === "node";
  const loaded: Plugin[] = [];

  if (isNode && isDev) {
    loaded.push(plugins.nodemon());
  }
  if (!isNode) {
    loaded.push(plugins.html());
  }
  if (!isNode && isDev) {
    loaded.push(plugins.hmr());
  }
  return loaded;
};
