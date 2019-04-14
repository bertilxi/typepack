import chalk from "chalk";

export const Logger = {
  log: (msg: string) => console.log(chalk.blue(msg)),
  error: (msg: string) => console.log(chalk.red(msg)),
  warn: (msg: string) => console.log(chalk.yellow(msg)),
  exit: (msg: string) => {
    console.log(chalk.red(msg));
    process.exit(1);
  }
};
