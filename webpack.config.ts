import { resolve } from "path";
import * as webpack from "webpack";
import * as nodeExternals from "webpack-node-externals";
import * as CleanWebpackPlugin from "clean-webpack-plugin";

const config = (): webpack.Configuration => {
  const isDev = process.env.NODE_ENV !== "production";

  return {
    target: "node",
    externals: [nodeExternals()],
    entry: "./src/index",
    mode: isDev ? "development" : "production",
    devtool: isDev ? "inline-source-map" : "source-map",
    resolve: {
      extensions: [".tsx", ".ts"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["ts-loader"],
          include: resolve("./src"),
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new webpack.BannerPlugin({
        banner: "#!/usr/bin/env node",
        raw: true
      })
    ],
    output: {
      filename: "index.js",
      path: resolve("./dist"),
      libraryTarget: "commonjs2"
    }
  };
};

export default config();
