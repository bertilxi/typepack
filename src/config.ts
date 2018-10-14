import * as FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import * as OfflinePlugin from "offline-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import * as SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import { join, resolve } from "path";
import * as webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import * as webpackMerge from "webpack-merge";
import * as nodeExternals from "webpack-node-externals";
import * as WebpackBar from "webpackbar";
import * as TerserPlugin from "terser-webpack-plugin";
import {
  getFile,
  getPaths,
  isBackEndConfig,
  isCliConfig,
  makeDevEntry,
  resolveContext,
  resolveHtmlTemplate,
  resolveLocal,
  rootPath
} from "./utils";

export interface IUserConfig {
  rules;
  plugins;
  mode: string;
}

const configuration = (
  env = "development",
  userConfig,
  isDebugging = false
): Partial<webpack.Configuration> => {
  const isDev = env !== "production";
  const context = rootPath;
  const paths = getPaths(userConfig.paths);

  const allConfigs: Partial<IUserConfig> = {
    rules: {
      typescript: {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              context: rootPath,
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ],
        include: paths.src,
        exclude: /node_modules/
      },
      babel: {
        test: /\.jsx?$/,
        use: [
          {
            loader: require.resolve("babel-loader")
          }
        ],
        include: paths.src,
        exclude: /node_modules/
      },
      html: {
        test: /\.(html)$/,
        use: { loader: require.resolve("html-loader") },
        include: paths.src,
        exclude: /node_modules/
      },
      scss: {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? require.resolve("style-loader") : MiniCssExtractPlugin.loader,
          {
            loader: require.resolve("css-loader"),
            options: { sourceMap: !isDev, importLoaders: 1 }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: { sourceMap: !isDev }
          },
          {
            loader: require.resolve("sass-loader"),
            options: { sourceMap: !isDev }
          }
        ]
      },
      images: {
        test: /\.(png|svg|jpg|gif)$/,
        loader: require.resolve("url-loader"),
        options: { limit: 10000, name: "images/[name].[hash:7].[ext]" }
      },
      fonts: {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: require.resolve("url-loader"),
        options: { limit: 10000, name: "fonts/[name].[hash:7].[ext]" }
      },
      media: {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: require.resolve("url-loader"),
        options: { limit: 10000, name: "media/[name].[hash:7].[ext]" }
      }
    },
    plugins: {
      miniCssExtract: new MiniCssExtractPlugin({
        filename: isDev ? "[name].css" : "css/[name].[contenthash].css",
        chunkFilename: isDev ? "[id].css" : "css/[id].[chunkhash].css"
      }),
      offline: new OfflinePlugin(),
      friendlyErrors: new FriendlyErrorsWebpackPlugin(),
      define: new webpack.DefinePlugin({
        "process.env": isDev
          ? getFile("./env.development.ts")
          : getFile("./env.production.ts")
      }),
      html: new HtmlWebpackPlugin({
        filename: "index.html",
        template: resolveHtmlTemplate(),
        inject: true,
        minify: isDev
          ? false
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
            }
      }),
      clean: new CleanWebpackPlugin(["dist"], { root: rootPath }),
      hmr: new webpack.HotModuleReplacementPlugin(),
      webpackbar: new WebpackBar({
        name: "TypePack"
      }),
      analyze: new BundleAnalyzerPlugin(),
      banner: new webpack.BannerPlugin({
        banner: "#!/usr/bin/env node",
        raw: true
      }),
      copyStatic: new CopyWebpackPlugin([
        {
          from: join(rootPath, "static"),
          to: paths.outputFolder,
          ignore: [".*"]
        }
      ])
    }
  };
  const { rules, plugins, mode }: IUserConfig = {
    ...allConfigs,
    ...userConfig
  };

  const commonConfig = {
    context,
    mode: isDev ? "development" : "production",
    devtool: isDev ? "cheap-module-eval-source-map" : "source-map",
    optimization: isDev
      ? {}
      : {
          removeAvailableModules: false,
          removeEmptyChunks: false,
          minimizer: [
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({
              cssProcessor: require("cssnano"),
              cssProcessorPluginOptions: {
                preset: [
                  "default",
                  {
                    discardComments: {
                      removeAll: true
                    }
                  }
                ]
              },
              canPrint: true
            })
          ],
          splitChunks: {
            chunks: "all"
          }
        },
    resolve: {
      symlinks: false,
      extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
      modules: [
        "node_modules",
        resolveContext(context, "node_modules"),
        resolveLocal("node_modules")
      ],
      alias: {
        "@": paths.src
      }
    },
    resolveLoader: {
      modules: [
        "node_modules",
        resolveContext(context, "node_modules"),
        resolveLocal("node_modules")
      ]
    },
    module: {
      rules: [rules.typescript, rules.babel]
    },
    plugins: [
      plugins.friendlyErrors,
      plugins.webpackbar,
      plugins.clean,
      plugins.define,
      ...(process.env.BUNDLE_ANALYZE ? [plugins.analyze] : []),
      ...(process.env.OFFLINE_PLUGIN ? [plugins.offline] : [])
    ],
    output: {
      publicPath: "/",
      filename: isDev ? "js/[name].js" : "js/[name].[chunkhash].js",
      chunkFilename: isDev ? "js/[id].js" : "js/[id].[chunkhash].js",
      path: paths.outputFolder,
      libraryTarget: "umd",
      pathinfo: false
    }
  };

  const webAppConfig = webpackMerge(commonConfig, {
    entry: isDev
      ? {
          main: makeDevEntry(paths.entry.main)
        }
      : paths.entry,
    module: {
      rules: [rules.html, rules.scss, rules.images, rules.fonts, rules.media]
    },
    plugins: [
      plugins.html,
      ...(isDev ? [plugins.hmr] : [plugins.miniCssExtract])
    ]
  });

  const backEndConfig = webpackMerge(commonConfig, {
    target: "node",
    externals: [nodeExternals()],
    entry: paths.entry,
    output: {
      filename: "index.js",
      path: resolve("./dist"),
      libraryTarget: "commonjs2"
    }
  });

  let resultConfig: webpack.Configuration = webAppConfig;

  if (isBackEndConfig(mode)) {
    resultConfig = backEndConfig;
  }

  if (isCliConfig(mode)) {
    resultConfig.plugins!.push(plugins.banner);
  }

  if (isDebugging) {
    console.log(JSON.stringify(resultConfig));
  }

  const smp = new SpeedMeasurePlugin({
    disable: !process.env.SMP
  });
  return smp.wrap(resultConfig);
};

export default configuration;
