import configuration from "../webpack/config";
import webpack from "webpack";
import { Logger } from "../service/logger";

const build = () => {
  const config = configuration();
  webpack(config, error => {
    error && Logger.exit(error.message);
  });
};

export default build;
