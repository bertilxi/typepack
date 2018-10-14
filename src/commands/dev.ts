import configuration from "../config";
import { getUserConfig, isBackEndConfig, rootPath } from "../utils";
import * as webpack from "webpack";
import { join } from "path";
import chalk from "chalk";
import * as WebpackDevServer from "webpack-dev-server";
import { once } from "ramda";
import * as nodemon from "nodemon";

const log = console.log;

module.exports = opts => {
  const userConfig = getUserConfig();
  const config = configuration("development", userConfig, opts.d);
  config.mode = "development";
  if (isBackEndConfig(userConfig.mode)) {
    webpack(config).watch(
      {},
      once(error => {
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
};
