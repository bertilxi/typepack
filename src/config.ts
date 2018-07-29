import { resolve, join } from "path";
import { existsSync } from "fs";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as ManifestPlugin from "webpack-manifest-plugin";
import * as nodeExternals from "webpack-node-externals";
import * as webpack from "webpack";
import * as webpackMerge from "webpack-merge";
import * as WebpackBar from "webpackbar";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const rootPath = resolve(process.cwd());

const paths = {
  src: join(rootPath, "./src"),
  entry: {
    main: join(rootPath, "./src/index")
  },
  htmlTemplate: join(rootPath, "./src/index.html"),
  outputFolder: join(rootPath, "./dist")
};

const resolveHtmlTemplate = () => {
  const srcHtmlPath = resolve(rootPath, "./src/index.html");
  const rootHtmlPath = resolve(rootPath, "./index.html");
  if (existsSync(srcHtmlPath)) {
    return srcHtmlPath;
  }
  if (existsSync(rootHtmlPath)) {
    return rootHtmlPath;
  }
};

const getTypePackDefaultConfig = isDev => ({
  paths,
  rules: {
    typescript: {
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            context: rootPath
          }
        }
      ],
      include: resolve(__dirname, paths.src),
      exclude: /node_modules/
    },
    babel: transform => ({
      test: /\.jsx?$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["env", "stage-1", "react"],
            plugins: transform ? ["transform-runtime"] : []
          }
        }
      ],
      include: resolve(__dirname, paths.src),
      exclude: /node_modules/
    }),
    html: {
      test: /\.(html)$/,
      use: {
        loader: "html-loader"
      }
    },
    scss: {
      test: /\.(sa|sc|c)ss$/,
      use: [
        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ],
      include: resolve(__dirname, paths.src)
    },
    images: {
      test: /\.(png|svg|jpg|gif)$/,
      use: ["file-loader"],
      include: resolve(__dirname, paths.src)
    },
    fonts: {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ["file-loader"],
      include: resolve(__dirname, paths.src)
    }
  },
  plugins: {
    miniCssExtract: new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    html: new HtmlWebpackPlugin({
      minify: !isDev,
      template: resolveHtmlTemplate()
    }),
    clean: new CleanWebpackPlugin(["dist"], { root: rootPath }),
    manifest: new ManifestPlugin(),
    hmr: new webpack.HotModuleReplacementPlugin(),
    webpackbar: new WebpackBar(),
    analyze: new BundleAnalyzerPlugin(),
    banner: new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true
    })
  }
});

const getCommonConfig = (mergedConfig, isDev) => ({
  mode: isDev ? "development" : "production",
  devtool: isDev ? "inline-source-map" : "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [mergedConfig.rules.typescript, mergedConfig.rules.babel()]
  },
  plugins: [
    mergedConfig.plugins.webpackbar,
    mergedConfig.plugins.clean,
    ...(process.env.BUNDLE_ANALYZE ? [mergedConfig.plugins.analyze] : [])
  ],
  output: {
    publicPath: "/",
    filename: isDev ? "main.js" : "[name].[chunkhash].js",
    path: resolve(__dirname, mergedConfig.paths.outputFolder),
    libraryTarget: "umd"
  }
});

const getWebAppConfig = (mergedConfig, isDev) => {
  return webpackMerge(getCommonConfig(mergedConfig, isDev), {
    entry: isDev
      ? {
          main: [
            "webpack-dev-server/client?http://localhost:8080",
            "webpack/hot/dev-server",
            join(rootPath, "./src/index")
          ]
        }
      : mergedConfig.paths.entry,
    module: {
      rules: [
        mergedConfig.rules.typescript,
        mergedConfig.rules.babel(true),
        mergedConfig.rules.html,
        mergedConfig.rules.scss,
        mergedConfig.rules.images,
        mergedConfig.rules.fonts
      ]
    },
    plugins: [
      mergedConfig.plugins.html,
      ...(isDev
        ? [mergedConfig.plugins.hmr]
        : [mergedConfig.plugins.miniCssExtract, mergedConfig.plugins.manifest])
    ]
  });
};

const getBackEndConfig = (mergedConfig, isDev) => {
  return webpackMerge(getCommonConfig(mergedConfig, isDev), {
    target: "node",
    externals: [nodeExternals()],
    entry: mergedConfig.paths.entry,
    output: {
      filename: "index.js",
      path: resolve("./dist"),
      libraryTarget: "commonjs2"
    }
  });
};

const isBackEndConfig = config =>
  config.mode && (config.mode === "server" || config.mode === "cli");

const isCliConfig = config => config.mode && config.mode === "cli";

const configuration = (
  env = "development",
  userConfig,
  isDebugging = false
): Partial<webpack.Configuration | any> => {
  const isDev = env !== "production";
  const defaultConfig = getTypePackDefaultConfig(isDev);
  const mergedConfig = { ...defaultConfig, ...userConfig };
  let resultConfig: any = getWebAppConfig(mergedConfig, isDev);

  if (isBackEndConfig(mergedConfig)) {
    resultConfig = getBackEndConfig(mergedConfig, isDev);
  }

  if (isCliConfig(mergedConfig)) {
    resultConfig.plugins.push(mergedConfig.plugins.banner);
  }

  if (isDebugging) {
    console.log(JSON.stringify(resultConfig));
  }

  return resultConfig;
};

export default configuration;
