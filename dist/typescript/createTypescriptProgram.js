"use strict";
exports.__esModule = true;
var ts = require("typescript");
var typescript_1 = require("typescript");
function createTypescriptProgram(fileNames) {
    var tsCompilerHost = ts.createCompilerHost({
        noEmit: true,
        noResolve: true,
        target: ts.ScriptTarget.Latest,
        experimentalDecorators: true,
        experimentalAsyncFunctions: true,
        jsx: typescript_1.JsxEmit.Preserve
    });
    return ts.createProgram({
        rootNames: fileNames,
        options: {},
        host: tsCompilerHost
    });
}
exports["default"] = createTypescriptProgram;
//# sourceMappingURL=createTypescriptProgram.js.map