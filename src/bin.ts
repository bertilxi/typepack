#!/usr/bin/env node
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

  .command("init [name] [mode]")
  .describe("Initialize a new project")
  .action(commands.init())

  .command("dev")
  .describe("Start development server")
  .action(commands.dev())

  .command("build")
  .describe("Start production build")
  .option("--dev", "Run build in development mode")
  .option("--analyze", "Launch bundle analyzer")
  .option("--smp", "Measure build times")
  .action(commands.build())

  .command("test")
  .describe("Run unit tests")
  .action(commands.test())

  .parse(process.argv);
