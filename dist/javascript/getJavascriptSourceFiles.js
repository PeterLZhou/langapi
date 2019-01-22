"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var utils_1 = require("../utils");
// Find source files that are fbt-containing candidates
function getJavascriptSourceFiles(sourceDir) {
    return utils_1.lines(child_process_1.execSync("find " + sourceDir + " -type f -iname '*.js' -or -iname '*.jsx' | xargs grep -E -l '\\btr\\x28'", {
        cwd: process.cwd()
    }));
}
exports.getJavascriptSourceFiles = getJavascriptSourceFiles;
//# sourceMappingURL=getJavascriptSourceFiles.js.map