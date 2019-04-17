import { Configuration } from "webpack";

import { paths } from "../service/path";
import { store } from "../service/store";
import { devtool, entry, oneOfRules, optimization, output } from "./misc";
import { loadPlugins, plugins } from "./plugins";

const extensions = [".tsx", ".ts", ".js", ".jsx", ".json"];

type ConfigBuilder = () => Configuration;

/*
TODO: 
- Add webpack.DefinePlugin or something like dotenv
- Add CopyWebpackPlugin
- Add BundleAnalyzerPlugin
*/

const buildConfig: ConfigBuilder = () => {
  const { env, mode, debug } = store.getState();
  const isDev = env !== "production";
  const isNode = mode && mode === "node";

  const config: Configuration = {
    context: paths.root,
    mode: isDev ? "development" : "production",
    devtool: devtool(),
    entry: entry(),
    target: isNode ? "node" : "web",
    externals: isNode ? [plugins.nodeExternals()] : [],
    resolve: {
      extensions
    },
    output: output(),
    optimization: optimization(),
    module: {
      rules: [
        {
          oneOf: oneOfRules()
        }
      ]
    },
    plugins: [
      plugins.webpackbar(),
      plugins.friendlyErrors(),
      plugins.clean(),
      ...loadPlugins()
    ]
  };

  if (debug) {
    console.log(config);
    console.log(JSON.stringify(config));
  }
  return config;
};

export default buildConfig;
