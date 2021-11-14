const staticPlugin = require("./staticPlugin");
const moduleRewritePlugin = require("./moduleRewritePlugin");
const moduleResolvePlugin = require("./moduleResolvePlugin");
const htmlRewritePlugin = require("./htmlRewritePlugin");
const compilerVuePlugin = require("./compilerVuePlugin");

module.exports = {
  staticPlugin,
  moduleRewritePlugin,
  moduleResolvePlugin,
  htmlRewritePlugin,
  compilerVuePlugin,
};
