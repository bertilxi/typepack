#!/usr/bin/env node
require("ts-node/register/transpile-only");
import * as sade from "sade";
const { version } = require("../package");

const commands = {
  init: () => require("./commands/init"),
  dev: () => require("./commands/dev"),
  build: () => require("./commands/build"),
  test: () => require("./commands/test")
};

const cli = sade("typepack");

cli
  .version(version)
  .option("--debug, -d", "Run CLI in debug mode")

  .command("init [name]")
  .describe("Initialize a new project")
  .option("-m, --mode", "The mode of the Typepack build", "web")
  .action(commands.init())

  .command("dev")
  .describe("Start development server")
  .option("--open", "Should the app be opened in the browser or not", true)
  .option("-p, --port", "A port number on which to start the application", 8080)
  .action(commands.dev())

  .command("build")
  .describe("Start production build")
  .option("--dev", "Run build in development mode", false)
  .option("--analyze", "Launch bundle analyzer", false)
  .option("--smp", "Measure build times", false)
  .action(commands.build())

  .command("test")
  .describe("Run unit tests")
  .action(commands.test())

  .parse(process.argv);
