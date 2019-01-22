"use strict";
exports.__esModule = true;
function throwAt(astNode, msg) {
    var startPosition = astNode.loc.start;
    throw new Error("Line " + startPosition.line + " Column " + (startPosition.column + 1) + ": " + msg);
}
exports.throwAt = throwAt;
function filterEmptyNodes(nodes) {
    return nodes.filter(function (node) {
        // Filter whitespace and comment block
        return !((node.type === "JSXText" && node.value.match(/^\s+$/)) ||
            (node.type === "JSXExpressionContainer" &&
                node.expression.type === "JSXEmptyExpression"));
    });
}
exports.filterEmptyNodes = filterEmptyNodes;
function isRequireAlias(path) {
    var grandParent = path.parentPath.parent;
    var parent = path.parent;
    var node = path.node;
    return (grandParent.type === "Program" &&
        parent.type === "VariableDeclaration" &&
        node.type === "VariableDeclarator" &&
        node.id.type === "Identifier" &&
        node.init &&
        isRequireCall(node.init) &&
        !node.init._isGeneratedInlinedRequire);
}
exports.isRequireAlias = isRequireAlias;
function isRequireCall(node) {
    return (node.type === "CallExpression" &&
        node.callee.type === "Identifier" &&
        node.callee.name === "require" &&
        node.arguments.length === 1 &&
        node.arguments[0].type === "StringLiteral");
}
function checkOption(option, validOptions, value) {
    var validValues = validOptions[option];
    if (!validOptions.hasOwnProperty(option) || validValues === undefined) {
        throwAt(value, "Invalid option \"" + option + "\". " +
            ("Only allowed: " + Object.keys(validOptions).join(", ") + " "));
    }
    else if (validValues !== true) {
        var valueStr = value && value.value;
        if (!validValues[valueStr]) {
            throw new Error("Invalid value, \"" + valueStr + "\" for \"" + option + "\". " +
                ("Only allowed: " + Object.keys(validValues).join(", ")));
        }
    }
    return option;
}
function checkOptions(properties, validOptions) {
    properties.forEach(function (node) {
        var key = node.key;
        checkOption(key.name || key.value, validOptions, node.value);
    });
    return properties;
}
function collectOptions(t, options, validOptions) {
    if (options && options.type !== "ObjectExpression") {
        throwAt(options, "tr(...) expects an ObjectExpression as its 2nd argument");
    }
    var key2value = {};
    var props = (options && options.properties) || [];
    checkOptions(props, validOptions).forEach(function (option) {
        var value = option.value.expression || option.value;
        var name = option.key.name || option.key.value;
        // Append only default valid options excluding "extraOptions",
        // which are used only by specific runtimes.
        if (validOptions.hasOwnProperty(name)) {
            key2value[name] = isTextualNode(value)
                ? normalizeSpaces(expandStringConcat(t, value).value)
                : value;
        }
    });
    return key2value;
}
exports.collectOptions = collectOptions;
function expandStringConcat(t, node) {
    if (node.type === "BinaryExpression") {
        if (node.operator !== "+") {
            throwAt(node, "Expected concatenation operator (+) but got " + node.operator);
        }
        return t.stringLiteral(expandStringConcat(t, node.left).value +
            expandStringConcat(t, node.right).value);
    }
    else if (node.type === "StringLiteral") {
        return node;
    }
    else if (node.type === "JSXText") {
        return node;
    }
    else if (node.type === "TemplateLiteral") {
        var string = "";
        var expressions = node.expressions;
        var index = 0;
        for (var _i = 0, _a = node.quasis; _i < _a.length; _i++) {
            var elem = _a[_i];
            if (elem.value.cooked) {
                string += elem.value.cooked;
            }
            if (index < expressions.length) {
                var expr = expressions[index++];
                // fbt.param expressions are already transformed to StringLiteral
                if (expr.type !== "StringLiteral") {
                    throwAt(node, "tr(...) does not yet support " + expr.type + " yet. Will come out in the next version");
                }
                string += expr.value;
            }
        }
        return t.stringLiteral(string);
    }
    throwAt(node, "tr" + " only accepts plain strings currently " +
        "See the docs at TODO: Insert docs for more info. " +
        ("Expected StringLiteral, TemplateLiteral, or concatenation; got " + node.type));
}
exports.expandStringConcat = expandStringConcat;
function isTextualNode(node) {
    if (node.type === "StringLiteral" || node.type === "JSXText") {
        return true;
    }
    else if (node.type === "BinaryExpression" && node.operator === "+") {
        return isTextualNode(node.left) && isTextualNode(node.right);
    }
    return false;
}
function normalizeSpaces(value, options) {
    if (options && options.preserveWhitespace) {
        return value;
    }
    return value.replace(/\s+/g, " ");
}
exports.normalizeSpaces = normalizeSpaces;
exports.ValidTrOptions = {
    project: true,
    author: true,
    preserveWhitespace: true,
    subject: true,
    common: true,
    doNotExtract: true
};
//# sourceMappingURL=babelUtils.js.map