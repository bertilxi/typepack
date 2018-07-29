import { existsSync } from "fs";
import { join, resolve } from "path";
import chalk from "chalk";
import configuration from "./config";
import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import * as Mocha from "mocha";
import * as glob from "glob";
import { once } from "ramda";
import * as nodemon from "nodemon";

const [, , ...args] = process.argv;
const log = console.log;
const rootPath = resolve(process.cwd());

declare const __webpack_require__;
declare const __non_webpack_require__;
const requireFx =
  typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;

const userConfigPath = join(rootPath, "./typepack.ts");
let userConfig: any = {};

if (existsSync(userConfigPath)) {
  userConfig = requireFx(userConfigPath);
}

const Commands = {
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

const isBackEndConfig = config =>
  config.mode && (config.mode === "server" || config.mode === "cli");

switch (args[0]) {
  case Commands.dev:
    const config = configuration("development", userConfig, isDebugging());
    config.mode = "development";
    if (isBackEndConfig(userConfig)) {
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
      const server = new webpackDevServer(webpack(config), options);
      server.listen(8080, error => {
        if (error) {
          log(chalk.red(error));
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
    process.env.__TS_PROJECT_PATH__ = rootPath;
    require("ts-mocha");
    const testPath =
      (userConfig && userConfig.test && userConfig.test.path) ||
      "./test/unit/**/*.ts";
    const mocha = new Mocha({
      timeout: 15000
    });
    const testFiles = glob.sync(join(rootPath, testPath));
    testFiles.forEach(file => mocha.addFile(file));
    mocha.run(failures => process.on("exit", () => process.exit(failures)));
    break;
  default:
    log(chalk.red(`Unknown Command : ${args}`));
    break;
}
