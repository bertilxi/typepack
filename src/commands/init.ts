import { rootPath } from "../utils";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import * as globby from "globby";
import * as mkdirp from "mkdirp";
import * as rimraf from "rimraf";
import * as sh from "shelljs";

const writeFile = (fullpath: string, content) => {
  const sections = fullpath.split("/");
  sections.pop();
  const path = sections.join("/");
  mkdirp.sync(path);
  writeFileSync(fullpath, content);
};

const copyTemplate = async (name: string, dirname: string, { mode, d }) => {
  const pkg = {
    name,
    version: "0.0.1",
    private: true
  };
  const paths = await globby(join(__dirname, `../../templates/${mode}/**/*`));
  const files = paths.map((path: string) => {
    const splittedName = path.split(
      join(__dirname, `../../templates/${mode}/`)
    );
    return {
      name: splittedName[splittedName.length - 1],
      content: readFileSync(path, "utf8")
    };
  });
  rimraf.sync(dirname);
  mkdirp.sync(dirname);

  if (d) {
    console.log(paths);
    console.log(files);
  }

  files.forEach(file => {
    writeFile(join(rootPath, name, file.name), file.content);
  });
  writeFile(join(rootPath, name, "package.json"), JSON.stringify(pkg, null, 2));
};

const installPackages = (dirname: string) => {
  const hasYarn = sh.which("yarn");
  const install = hasYarn ? "yarn add" : "npm install --save";
  const devInstall = hasYarn ? "yarn add -D" : "npm install --save-dev";

  const dependencies = ["@babel/runtime"].join(" ");
  const devDependencies = [
    "typepack",
    "@babel/core",
    "@babel/preset-env",
    "@babel/plugin-transform-runtime"
  ].join(" ");

  sh.cd(dirname);
  if (
    sh.exec(`${install} ${dependencies}`).code !== 0 ||
    sh.exec(`${devInstall} ${devDependencies}`).code !== 0
  ) {
    sh.echo("Error: failed to install needed modules");
    sh.exit(1);
  }
};

module.exports = async (name: string, opts) => {
  const dirname = join(rootPath, name);
  await copyTemplate(name, dirname, opts);
  installPackages(dirname);
};
