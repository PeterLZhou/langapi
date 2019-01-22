"use strict";
exports.__esModule = true;
var typescript_1 = require("typescript");
var TR = "tr";
function throwAt(node, sourceFile, msg) {
    var startPosition = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    throw new Error("Line " + startPosition.line + " Column " + (startPosition.character + 1) + ": " + msg);
}
exports.throwAt = throwAt;
function assertCorrectNumberOfArguments(node, sourceFile) {
    if (!node.arguments || node.arguments.length != 1) {
        throwAt(node, sourceFile, "Incorrect number of arguments for this tr call");
    }
}
exports.assertCorrectNumberOfArguments = assertCorrectNumberOfArguments;
function expandStringConcat(node, sourceFile) {
    if (node.kind === typescript_1.SyntaxKind.BinaryExpression) {
        if (node.operatorToken.kind !== typescript_1.SyntaxKind.PlusToken) {
            throwAt(node, sourceFile, "Expected concatenation operator (+) but got " + node.operatorToken.kind);
        }
        return (expandStringConcat(node.left, sourceFile) +
            expandStringConcat(node.right, sourceFile));
    }
    else if (node.kind === typescript_1.SyntaxKind.StringLiteral) {
        return node.text;
    }
    else if (node.kind === typescript_1.SyntaxKind.JsxText) {
        return node.getText(sourceFile);
    }
    else if (node.kind ===
        typescript_1.SyntaxKind.TemplateExpression /* TODO do not support template literals yet */) {
        throwAt(node, sourceFile, "We don't support template expressions yet - get back to us in a version or so!");
        // let string = "";
        // const expressions = node.expressions;
        // let index = 0;
        // for (const elem of node.quasis) {
        //   if (elem.value.cooked) {
        //     string += elem.value.cooked;
        //   }
        //   if (index < expressions.length) {
        //     const expr = expressions[index++];
        //     // fbt.param expressions are already transformed to StringLiteral
        //     if (expr.type !== "StringLiteral") {
        //       throwAt(
        //         node,
        //         `tr(...) does not yet support ${
        //           expr.type
        //         } yet. Will come out in the next version`
        //       );
        //     }
        //     string += (expr as StringLiteral).value;
        //   }
        // }
        // return t.stringLiteral(string);
    }
    throwAt(node, sourceFile, "tr" + " only accepts plain strings currently " +
        "See the docs at TODO: Insert docs for more info. " +
        ("Expected StringLiteral, TemplateLiteral, or concatenation; got " + node.kind));
}
exports.expandStringConcat = expandStringConcat;
function isTranslateCallExpression(node) {
    if (node &&
        node.kind == typescript_1.SyntaxKind.CallExpression &&
        node.expression.escapedText == TR) {
        return true;
    }
    return false;
}
exports.isTranslateCallExpression = isTranslateCallExpression;
function containsOnlyPlaintext(node) {
    if (node.kind === typescript_1.SyntaxKind.BinaryExpression &&
        node.operatorToken.kind == typescript_1.SyntaxKind.PlusToken) {
        return (containsOnlyPlaintext(node.left) &&
            containsOnlyPlaintext(node.right));
    }
    else if (node.kind === typescript_1.SyntaxKind.StringLiteral ||
        node.kind === typescript_1.SyntaxKind.JsxText) {
        return true;
    }
    return false;
}
exports.containsOnlyPlaintext = containsOnlyPlaintext;
function normalizeSpaces(value, options) {
    if (options && options.preserveWhitespace) {
        return value;
    }
    return value.replace(/\s+/g, " ");
}
exports.normalizeSpaces = normalizeSpaces;
//# sourceMappingURL=typescriptUtils.js.map