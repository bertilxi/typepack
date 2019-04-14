require("ts-node/register/transpile-only");
const { version } = require("../package.json");
import sade from "sade";
import { bootstrap } from "./service/store";
import build from "./command/build";
import dev from "./command/dev";

const cli = sade("typepack");

cli
  .version(version)
  .option("--debug, -d", "Run CLI in debug mode")

  .command("build")
  .describe("Start production build")
  .option("--env, -e", "Build mode", "production")
  .action(bootstrap(build))

  .command("dev")
  .describe("Start development server")
  .option("--open, -o", "Should the app be opened in the browser or not", false)
  .option("--port, -p", "A port number to start the application", 3000)
  .option("--env, -e", "Build mode", "development")
  .action(bootstrap(dev))

  .parse(process.argv);
