import configuration from "../webpack/config";
import webpack from "webpack";
import { join } from "path";
import WebpackDevServer from "webpack-dev-server";
import { Logger } from "../service/logger";
import { store } from "../service/store";
import { paths } from "../service/path";

const dev = opts => {
  const { mode, devServer } = store.getState();
  const config: any = configuration();

  if (mode === "node") {
    webpack(config).watch({}, error => {
      error && Logger.exit(error.message);
    });
    return;
  }

  const port = opts.port;
  const open = opts.open;
  const host = "0.0.0.0";

  config.devServer = {
    ...config.devServer,
    contentBase: join(paths.root, "./assets"),
    open,
    host,
    port,
    overlay: true,
    inline: true,
    quiet: true,
    hot: true,
    historyApiFallback: true,
    proxy: devServer && devServer.proxy
  };

  const server = new WebpackDevServer(webpack(config), config.devServer);

  server.listen(port, host, error => {
    if (error) {
      server.close();
      Logger.exit(error.message);
    }
  });
};

export default dev;
