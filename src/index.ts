require("ts-node/register/transpile-only");
const { version } = require("../package.json");
import sade from "sade";
import build from "./build";

const cli = sade("typepack");

cli
  .version(version)
  .option("--debug, -d", "Run CLI in debug mode")

  .command("build")
  .describe("Start production build")
  .option("--dev", "Run build in development mode", false)
  .option("--analyze", "Launch bundle analyzer", false)
  .option("--smp", "Measure build times", false)
  .action(build)

  .parse(process.argv);
