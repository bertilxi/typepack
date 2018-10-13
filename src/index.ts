import { existsSync } from "fs";
import { join, resolve } from "path";
import chalk from "chalk";
import configuration from "./config";
import * as webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import { once } from "ramda";
import * as nodemon from "nodemon";
import { isBackEndConfig, requireFx } from "./utils";
import { init } from "./template";

const [, , ...args] = process.argv;
const log = console.log;
const rootPath = resolve(process.cwd());

const userConfigPath = join(rootPath, "./typepack.ts");
let userConfig: any = {};

if (existsSync(userConfigPath)) {
  userConfig = requireFx(userConfigPath);
}

const Commands = {
  init: "init",
  dev: "dev",
  build_dev: "build:dev",
  build_analyze: "build:analyze",
  build: "build",
  test: "test"
};

const isDebugging = () => !!args.find(arg => arg === "-d");

const startWebpack = env => {
  const config = configuration(env, userConfig, isDebugging());
  config.mode = env;
  webpack(config, (error, stats) => {
    if (error) {
      console.error(error);
      return;
    }
  });
};

switch (args[0]) {
  case Commands.init:
    const name = args[1];
    const mode = args[2];
    init(name, mode);
    break;
  case Commands.dev:
    const config = configuration("development", userConfig, isDebugging());
    config.mode = "development";
    if (isBackEndConfig(userConfig.mode)) {
      webpack(config).watch(
        {},
        once((error, stats) => {
          if (error) {
            console.error(error);
            return;
          }
          nodemon({
            script: join(rootPath, "./dist/index.js"),
            watch: join(rootPath, "./dist/**/*.js")
          }).on("quit", process.exit);
        })
      );
    } else {
      log(chalk.green("WebpackDevServer Launched"));
      const options = {
        contentBase: join(rootPath, "./dist"),
        hot: true,
        inline: true,
        stats: { colors: true },
        host: "localhost",
        historyApiFallback: true
      };
      const server = new WebpackDevServer(webpack(config), options);
      server.listen(8080, error => {
        if (error) {
          log(chalk.red(error.message));
        }
        log(chalk.green("WebpackDevServer listening at http://localhost:8080"));
      });
    }
    break;
  case Commands.build:
    startWebpack("production");
    break;
  case Commands.build_dev:
    startWebpack("development");
    break;
  case Commands.build_analyze:
    process.env.BUNDLE_ANALYZE = "true";
    startWebpack("production");
    break;
  case Commands.test:
    break;
  default:
    log(chalk.red(`Unknown Command : ${args}`));
    break;
}
