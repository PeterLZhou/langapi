"use strict";
exports.__esModule = true;
var typescriptUtils_1 = require("./typescriptUtils");
function findTranslateCalls(node, sourceFile) {
    if (typescriptUtils_1.isTranslateCallExpression(node)) {
        var lineAndCharLocation = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        typescriptUtils_1.assertCorrectNumberOfArguments(node, sourceFile);
        var argumentNode = node.arguments[0];
        return [].concat.apply([
            {
                line: lineAndCharLocation.line + 1,
                character: lineAndCharLocation.character,
                sourceFileName: sourceFile.fileName,
                text: typescriptUtils_1.normalizeSpaces(typescriptUtils_1.expandStringConcat(argumentNode, sourceFile).trim()),
                plaintextOnly: typescriptUtils_1.containsOnlyPlaintext(argumentNode)
            }
        ], node.getChildren(sourceFile).map(function (c) { return findTranslateCalls(c, sourceFile); }));
    }
    return [].concat.apply([], node.getChildren(sourceFile).map(function (c) { return findTranslateCalls(c, sourceFile); }));
}
exports.findTranslateCalls = findTranslateCalls;
//# sourceMappingURL=LangTrCollector.js.map