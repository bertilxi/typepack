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
  const config = configuration("development", userConfig, opts.d, opts.port);
  config.mode = "development";
  if (isBackEndConfig(userConfig.mode)) {
    webpack(config).watch(
      {},
      once(error => {
        if (error) {
          console.error(error);
          process.exit(1);
          return;
        }
        nodemon({
          script: join(rootPath, "./dist/index.js"),
          watch: join(rootPath, "./dist/**/*")
        }).on("quit", process.exit);
      })
    );
  } else {
    log(chalk.green("WebpackDevServer Launched"));

    const port = opts.port;
    const open = opts.open;
    const hostname = "0.0.0.0";

    const server = new WebpackDevServer(webpack(config), {
      contentBase: join(rootPath, "./assets"),
      open,
      overlay: true,
      inline: true,
      host: hostname,
      quiet: true,
      port: opts.port,
      hot: true,
      historyApiFallback: true,
      proxy: userConfig && userConfig.devServer && userConfig.devServer.proxy
    });

    server.listen(port, hostname, error => {
      if (error) {
        server.close();
        log(chalk.red(error.message));
        process.exit(1);
      }
    });
  }
};
