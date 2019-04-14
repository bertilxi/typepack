import configuration from "./config";
import webpack from "webpack";

const build = _options => {
  // const userConfig = getUserConfig();
  const config = configuration();
  webpack(config, error => {
    if (error) {
      console.error(error);
      return;
    }
  });
};

export default build;
