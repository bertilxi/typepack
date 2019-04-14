import { Configuration } from "webpack";
import { plugins } from "./plugins";
import { store } from "../service/store";
import { paths } from "../service/path";
import { output, optimization } from "./misc";
import { rules } from "./rules";

const extensions = [".tsx", ".ts", ".js", ".jsx", ".json"];

type ConfigBuilder = () => Configuration;

const buildConfig: ConfigBuilder = () => {
  const { env, mode, debug } = store.getState();
  const isDev = env !== "production";
  const isNode = mode && mode === "node";

  const config: Configuration = {
    context: paths.root,
    mode: isDev ? "development" : "production",
    devtool: isDev ? "eval" : "source-map",
    entry: paths.entry,
    target: isNode ? "node" : "web",
    externals: isNode ? [plugins.nodeExternals()] : [],
    resolve: {
      extensions
    },
    output: output(isNode),
    optimization: optimization(isDev),
    module: {
      rules: [
        {
          oneOf: [rules.ts]
        }
      ]
    },
    plugins: [
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
