module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, main, license, homepage, bugs, repository, keywords, bin, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"typepack\",\"version\":\"0.3.0-test\",\"main\":\"lib/cli.js\",\"license\":\"MIT\",\"homepage\":\"https://github.com/bertilxi/typepack\",\"bugs\":\"https://github.com/bertilxi/typepack/issues\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/bertilxi/typepack.git\"},\"keywords\":[\"CLI\",\"zero config\",\"typescript\",\"web\",\"server\"],\"bin\":{\"tp\":\"./lib/cli.js\",\"typepack\":\"./lib/cli.js\"},\"scripts\":{\"prebuild\":\"rimraf ./dist\",\"build\":\"tsc\"},\"dependencies\":{\"clean-webpack-plugin\":\"^2.0.1\",\"friendly-errors-webpack-plugin\":\"^1.7.0\",\"sade\":\"^1.4.2\",\"ts-loader\":\"^5.3.3\",\"ts-node\":\"^8.0.3\",\"typescript\":\"^3.4.3\",\"webpack\":\"^4.30.0\",\"webpack-node-externals\":\"^1.7.2\"},\"devDependencies\":{\"@types/node\":\"^11.13.4\",\"@types/webpack\":\"^4.4.27\",\"@typescript-eslint/eslint-plugin\":\"^1.6.0\",\"@typescript-eslint/parser\":\"^1.6.0\",\"eslint\":\"^5.16.0\",\"eslint-config-prettier\":\"^4.1.0\",\"eslint-plugin-prettier\":\"^3.0.1\",\"prettier\":\"^1.17.0\"}};\n\n//# sourceURL=webpack:///./package.json?");

/***/ }),

/***/ "./src/build.ts":
/*!**********************!*\
  !*** ./src/build.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar config_1 = __importDefault(__webpack_require__(/*! ./config */ \"./src/config.ts\"));\nvar webpack_1 = __importDefault(__webpack_require__(/*! webpack */ \"webpack\"));\nvar build = function (_options) {\n    // const userConfig = getUserConfig();\n    var config = config_1.default();\n    webpack_1.default(config, function (error) {\n        if (error) {\n            console.error(error);\n            return;\n        }\n    });\n};\nexports.default = build;\n\n\n//# sourceURL=webpack:///./src/build.ts?");

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar path_1 = __webpack_require__(/*! path */ \"path\");\nvar plugins_1 = __webpack_require__(/*! ./plugins */ \"./src/plugins.ts\");\nvar root = path_1.resolve(process.cwd());\nvar paths = {\n    root: root,\n    src: path_1.join(root, \"./src\"),\n    output: path_1.join(root, \"dist\"),\n    entry: {\n        main: path_1.join(root, \"./src/index.ts\")\n    }\n};\nvar extensions = [\".tsx\", \".ts\", \".js\", \".jsx\", \".json\"];\nvar loaders = {\n    ts: {\n        loader: /*require.resolve*/(/*! ts-loader */ \"ts-loader\"),\n        options: {\n            context: paths.root,\n            transpileOnly: true,\n            experimentalWatchApi: true\n        }\n    }\n};\nvar buildConfig = function () {\n    return {\n        context: paths.root,\n        mode: \"development\",\n        devtool: \"eval\",\n        entry: paths.entry,\n        target: \"node\",\n        externals: [plugins_1.plugins.nodeExternals],\n        resolve: {\n            extensions: extensions\n        },\n        output: {\n            filename: \"index.js\",\n            path: paths.output,\n            libraryTarget: \"commonjs2\"\n        },\n        module: {\n            rules: [\n                {\n                    oneOf: [\n                        {\n                            test: /\\.tsx?$/,\n                            use: [loaders.ts],\n                            include: paths.src,\n                            exclude: /(node_modules)/\n                        }\n                    ]\n                }\n            ]\n        },\n        plugins: [plugins_1.plugins.friendlyErrors, plugins_1.plugins.clean]\n    };\n};\nexports.default = buildConfig;\n\n\n//# sourceURL=webpack:///./src/config.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ts-node/register/transpile-only */ \"ts-node/register/transpile-only\");\nvar version = __webpack_require__(/*! ../package.json */ \"./package.json\").version;\nvar sade_1 = __importDefault(__webpack_require__(/*! sade */ \"sade\"));\nvar build_1 = __importDefault(__webpack_require__(/*! ./build */ \"./src/build.ts\"));\nvar cli = sade_1.default(\"typepack\");\ncli\n    .version(version)\n    .option(\"--debug, -d\", \"Run CLI in debug mode\")\n    .command(\"build\")\n    .describe(\"Start production build\")\n    .option(\"--dev\", \"Run build in development mode\", false)\n    .option(\"--analyze\", \"Launch bundle analyzer\", false)\n    .option(\"--smp\", \"Measure build times\", false)\n    .action(build_1.default)\n    .parse(process.argv);\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/plugins.ts":
/*!************************!*\
  !*** ./src/plugins.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar friendly_errors_webpack_plugin_1 = __importDefault(__webpack_require__(/*! friendly-errors-webpack-plugin */ \"friendly-errors-webpack-plugin\"));\nvar clean_webpack_plugin_1 = __importDefault(__webpack_require__(/*! clean-webpack-plugin */ \"clean-webpack-plugin\"));\nvar webpack_node_externals_1 = __importDefault(__webpack_require__(/*! webpack-node-externals */ \"webpack-node-externals\"));\nexports.plugins = {\n    friendlyErrors: new friendly_errors_webpack_plugin_1.default(),\n    clean: new clean_webpack_plugin_1.default(),\n    nodeExternals: webpack_node_externals_1.default()\n};\n\n\n//# sourceURL=webpack:///./src/plugins.ts?");

/***/ }),

/***/ "clean-webpack-plugin":
/*!***************************************!*\
  !*** external "clean-webpack-plugin" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"clean-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22clean-webpack-plugin%22?");

/***/ }),

/***/ "friendly-errors-webpack-plugin":
/*!*************************************************!*\
  !*** external "friendly-errors-webpack-plugin" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"friendly-errors-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22friendly-errors-webpack-plugin%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "sade":
/*!***********************!*\
  !*** external "sade" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sade\");\n\n//# sourceURL=webpack:///external_%22sade%22?");

/***/ }),

/***/ "ts-loader":
/*!****************************!*\
  !*** external "ts-loader" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ts-loader\");\n\n//# sourceURL=webpack:///external_%22ts-loader%22?");

/***/ }),

/***/ "ts-node/register/transpile-only":
/*!**************************************************!*\
  !*** external "ts-node/register/transpile-only" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ts-node/register/transpile-only\");\n\n//# sourceURL=webpack:///external_%22ts-node/register/transpile-only%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-node-externals\");\n\n//# sourceURL=webpack:///external_%22webpack-node-externals%22?");

/***/ })

/******/ });