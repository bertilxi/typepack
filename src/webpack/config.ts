import { Configuration } from "webpack";
import { plugins } from "./plugins";
import { store } from "../service/store";
import { paths } from "../service/path";
import { output, optimization, devtool, oneOfRules } from "./misc";

const extensions = [".tsx", ".ts", ".js", ".jsx", ".json"];

type ConfigBuilder = () => Configuration;

const buildConfig: ConfigBuilder = () => {
  const { env, mode, debug } = store.getState();
  const isDev = env !== "production";
  const isNode = mode && mode === "node";

  const config: Configuration = {
    context: paths.root,
    mode: isDev ? "development" : "production",
    devtool: devtool(),
    entry: paths.entry,
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
      ...(isNode ? [plugins.nodemon()] : [])
    ]
  };

  if (debug) {
    console.log(config);
    console.log(JSON.stringify(config));
  }
  return config;
};

export default buildConfig;
