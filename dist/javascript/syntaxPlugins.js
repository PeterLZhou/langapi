"use strict";
exports.__esModule = true;
exports.syntaxPluginsMap = {
    "@babel/plugin-syntax-class-properties": require("@babel/plugin-syntax-class-properties"),
    "@babel/plugin-syntax-flow": require("@babel/plugin-syntax-flow"),
    "@babel/plugin-syntax-jsx": require("@babel/plugin-syntax-jsx"),
    "@babel/plugin-syntax-object-rest-spread": require("@babel/plugin-syntax-object-rest-spread"),
    "@babel/plugin-syntax-numeric-separator": require("@babel/plugin-syntax-numeric-separator"),
    "@babel/plugin-syntax-optional-chaining": require("@babel/plugin-syntax-optional-chaining"),
    "@babel/plugin-syntax-nullish-coalescing-operator": require("@babel/plugin-syntax-nullish-coalescing-operator"),
    "@babel/plugin-syntax-optional-catch-binding": require("@babel/plugin-syntax-optional-catch-binding")
    // This file in fbsource has the following enabled.
    // '@babel/plugin-syntax-dynamic-import': require('@babel/plugin-syntax-dynamic-import'),
};
exports.syntaxPluginsList = Object.keys(exports.syntaxPluginsMap).map(function (name) {
    return exports.syntaxPluginsMap[name];
});
//# sourceMappingURL=syntaxPlugins.js.map