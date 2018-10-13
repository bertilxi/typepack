import { rootPath } from "./utils";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import * as globby from "globby";
import * as mkdirp from "mkdirp";
import * as rimraf from "rimraf";
import * as sh from "shelljs";

const getTypepackConfig = (mode?) => `module.exports = { ${
  mode ? `mode: "${mode}"` : ""
} };

`;

const writeFile = (fullpath: string, content) => {
  const sections = fullpath.split("/");
  sections.pop();
  const path = sections.join("/");
  mkdirp.sync(path);
  writeFileSync(fullpath, content);
};

const copyTemplate = async (name: string, dirname: string, mode?: string) => {
  const pkg = require("./pkg.json");
  const paths = await globby(join(rootPath, "./templates/base/**/*"));
  const files = paths.map((path: string) => {
    const splittedName = path.split(join(rootPath, "./templates/base/"));
    return {
      name: splittedName[splittedName.length - 1],
      content: readFileSync(path, "utf8")
    };
  });
  pkg.name = name;
  rimraf.sync(dirname);
  mkdirp.sync(dirname);

  console.log(paths);
  console.log(files);

  files.forEach(file => {
    writeFile(join(rootPath, name, file.name), file.content);
  });
  writeFile(join(rootPath, name, "package.json"), JSON.stringify(pkg, null, 2));
  writeFile(join(rootPath, name, "typepack.ts"), getTypepackConfig(mode));
};

const installPackages = (dirname: string) => {
  const hasYarn = sh.which("yarn");
  const install = hasYarn ? "yarn add" : "npm install --save";
  const devInstall = hasYarn ? "yarn add -D" : "npm install --save-dev";

  const dependencies = ["@babel/runtime"].join(" ");
  const devDependencies = [
    "typepack",
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

export const init = async (name: string, mode?: string) => {
  const dirname = join(rootPath, name);
  await copyTemplate(name, dirname, mode);
  installPackages(dirname);
};
