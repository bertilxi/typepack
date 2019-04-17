import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import NodemonPlugin from "nodemon-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { join } from "path";
import { paths } from "../service/path";
import WebpackBar from "webpackbar";

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
    })
};
