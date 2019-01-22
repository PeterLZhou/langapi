"use strict";
exports.__esModule = true;
var ts = require("typescript");
// This is never used
function default_1(opts) {
    function visitor(ctx, sf) {
        var visitor = function (node) {
            // here we can check each node and potentially return
            // new nodes if we want to leave the node as is, and
            // continue searching through child nodes:
            return ts.visitEachChild(node, visitor, ctx);
        };
        return visitor;
    }
    return function (ctx) {
        return function (sf) { return ts.visitNode(sf, visitor(ctx, sf)); };
    };
}
exports["default"] = default_1;
//# sourceMappingURL=LangTypescriptPlugin.js.map