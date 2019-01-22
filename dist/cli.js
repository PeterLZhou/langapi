#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var optimist = require("optimist");
var path = require("path");
var commandlinetools_1 = require("./commandlinetools");
var args = process.argv.slice(0);
var argv = optimist
    .usage("The command line interface for Lang API TODO: URL")
    .describe("h", "Display usage message")
    .alias("h", "help")["default"]("src", path.join(process.cwd(), "src"))
    .describe("src", "The source folder in which to look for JS source containing tr. Defaults to CWD")["default"]("root", process.cwd())
    .describe("root", "The folder from which to make source paths relative. " +
    "e.g. '/' for absolute paths.  Defaults to CWD")["default"]("ts", false)
    .describe("typescript", "A boolean flag determining whether initialization should be in js or ts.").argv;
try {
    switch (args[2]) {
        case "pull":
            commandlinetools_1.pull(argv.src);
            break;
        case "push":
            commandlinetools_1.push(argv.src, argv.ts);
            break;
        case "init":
            commandlinetools_1.init(argv.src, argv.ts);
            break;
    }
}
catch (err) {
    throw err;
}
//# sourceMappingURL=cli.js.map