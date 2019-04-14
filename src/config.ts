import { Configuration } from "webpack";
import { resolve, join } from "path";
import { plugins } from "./plugins";

const root = resolve(process.cwd());
const paths = {
  root,
  src: join(root, "./src"),
  output: join(root, "dist"),
  entry: {
    main: join(root, "./src/index.ts")
  }
};

const extensions = [".tsx", ".ts", ".js", ".jsx", ".json"];

const loaders = {
  ts: {
    loader: require.resolve("ts-loader"),
    options: {
      context: paths.root,
      transpileOnly: true,
      experimentalWatchApi: true
    }
  }
};

type ConfigBuilder = () => Configuration;

const buildConfig: ConfigBuilder = () => {
  return {
    context: paths.root,
    mode: "development",
    devtool: "eval",
    entry: paths.entry,
    target: "node",
    externals: [plugins.nodeExternals],
    resolve: {
      extensions
    },
    output: {
      filename: "index.js",
      path: paths.output,
      libraryTarget: "commonjs2"
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.tsx?$/,
              use: [loaders.ts],
              include: paths.src,
              exclude: /(node_modules)/
            }
          ]
        }
      ]
    },
    plugins: [plugins.friendlyErrors, plugins.clean]
  };
};

export default buildConfig;
