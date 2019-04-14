import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import nodeExternals from "webpack-node-externals";

export const plugins = {
  friendlyErrors: new FriendlyErrorsWebpackPlugin(),
  clean: new CleanWebpackPlugin(),
  nodeExternals: nodeExternals()
};
