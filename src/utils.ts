import { existsSync } from "fs";
import { resolve, join } from "path";

export const rootPath = resolve(process.cwd());

declare const __webpack_require__;
declare const __non_webpack_require__;
export const requireFx =
  typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;

export const getPaths = (userPaths = {}) => ({
  src: join(rootPath, "./src"),
  entry: {
    main: join(rootPath, "./src/index")
  },
  htmlTemplate: join(rootPath, "./src/index.html"),
  outputFolder: join(rootPath, "./dist"),
  ...userPaths
});

export const resolveHtmlTemplate = () => {
  const srcHtmlPath = resolve(rootPath, "./src/index.html");
  const rootHtmlPath = resolve(rootPath, "./index.html");
  if (existsSync(srcHtmlPath)) {
    return srcHtmlPath;
  }
  if (existsSync(rootHtmlPath)) {
    return rootHtmlPath;
  }
};

export const makeDevEntry = entry => {
  return [
    require.resolve("webpack-dev-server/client") + "?http://localhost:9001",
    require.resolve("webpack/hot/dev-server"),
    entry
  ];
};

export const isBackEndConfig = mode =>
  mode && (mode === "server" || mode === "cli");

export const isCliConfig = mode => mode && mode === "cli";

export const resolveLocal = (...args) => {
  return join(__dirname, "../../", ...args);
};

export const resolveContext = (context, path) => {
  return resolve(context, path);
};

export const getFile = relativePath => {
  const filepath = join(rootPath, relativePath);
  if (existsSync(filepath)) {
    return requireFx(filepath);
  }
};
