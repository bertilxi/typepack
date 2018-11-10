import { rootPath } from "../utils";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import * as globby from "globby";
import * as mkdirp from "mkdirp";
import * as rimraf from "rimraf";
import * as sh from "shelljs";
import chalk from "chalk";

const writeFile = (fullpath: string, content) => {
  const sections = fullpath.split("/");
  sections.pop();
  const path = sections.join("/");
  mkdirp.sync(path);
  writeFileSync(fullpath, content);
};

const copyTemplate = async (
  name: string,
  dirname: string,
  { mode, d, force }
) => {
  const pkg = {
    name,
    version: "0.0.1",
    private: true
  };
  const paths: string[] = await globby(
    join(__dirname, `../../templates/${mode}/**/*`)
  );
  const files = paths.map((path: string) => {
    const splittedName = path.split(
      join(__dirname, `../../templates/${mode}/`)
    );
    return {
      name: splittedName[splittedName.length - 1],
      content: readFileSync(path)
    };
  });

  if (d) {
    console.log(paths);
    console.log(files);
  }

  if (!paths || !paths.length) {
    console.log(chalk.red("Template not exists."));
    process.exit(1);
    return;
  }

  if (force) {
    rimraf.sync(dirname);
  }

  if (existsSync(dirname)) {
    console.log(chalk.red("Dirname already exists."));
    console.log(
      `use ${chalk.blue("--force")} to delete it and create a new one.`
    );
    process.exit(1);
    return;
  }

  mkdirp.sync(dirname);

  files.forEach(file => {
    writeFile(join(rootPath, name, file.name), file.content);
  });
  writeFile(join(rootPath, name, "package.json"), JSON.stringify(pkg, null, 2));
};

const installPackages = (dirname: string, mode: string) => {
  const hasYarn = sh.which("yarn");
  const install = hasYarn ? "yarn add" : "npm install --save";
  const devInstall = hasYarn ? "yarn add -D" : "npm install --save-dev";

  const dependencies = ["@babel/runtime"];
  const devDependencies = [
    "typepack",
    "@babel/core",
    "@babel/preset-env",
    "@babel/plugin-transform-runtime"
  ];

  if (mode === "react") {
    const reactDeps = ["react", "react-dom"];
    const reactDevDeps = [
      "@types/react",
      "@types/react-dom",
      "@babel/preset-react"
    ];
    dependencies.concat(reactDeps);
    devDependencies.concat(reactDevDeps);
  }

  sh.cd(dirname);
  if (
    sh.exec(`${install} ${dependencies.join(" ")}`).code !== 0 ||
    sh.exec(`${devInstall} ${devDependencies.join(" ")}`).code !== 0
  ) {
    sh.echo("Error: failed to install needed modules");
    sh.exit(1);
  }
};

module.exports = async (name: string, opts) => {
  const dirname = join(rootPath, name);
  await copyTemplate(name, dirname, opts);
  installPackages(dirname, opts.mode);
};
