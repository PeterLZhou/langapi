"use strict";
exports.__esModule = true;
var LangNodeChecker_1 = require("./LangNodeChecker");
var babelUtils_1 = require("./babelUtils");
/**
 * Default options passed from a docblock.
 */
var defaultOptions = {};
/**
 * An array containing all collected trFunctionCalls.
 */
var trFunctionCalls = [];
/**
 * An array containing the child to parent relationships for implicit nodes.
 */
var childToParent;
function LangBabelPlugin(babel) {
    var t = babel.types;
    return {
        pre: function () {
            trFunctionCalls = [];
            childToParent = {};
        },
        name: "langapi",
        visitor: {
            JSXElement: function (path, state) { },
            CallExpression: function (path, state) {
                var node = path.node;
                var visitor = this;
                var moduleName = "tr";
                var checker = LangNodeChecker_1["default"];
                if (!checker.isModuleCall(node)) {
                    // This collects mappings of require modules to their variable names
                    if (babelUtils_1.isRequireAlias(path.parentPath)) {
                        var _moduleName = node.arguments[0].value;
                        var alias = path.parentPath.node.id.name;
                        // fbtMethodCallVisitors.setFbtEnumRequireMap(alias, _moduleName);
                    }
                    return;
                }
                // TODO Can't check for this yet.
                // if (moduleName === FBT && !checker.isJSModuleBound(path)) {
                //   throwAt(
                //     path.node,
                //     "`fbt` is not bound. Did you forget to require('fbt')?"
                //   );
                // }
                // Contains params and enums in the order in which they appear.
                var runtimeArgs = [];
                var variations = {};
                var methodsState = {
                    paramSet: {},
                    runtimeArgs: runtimeArgs,
                    variations: variations,
                    hasTable: false,
                    src: visitor.file.code
                };
                // path.traverse(fbtMethodCallVisitors.call(t, moduleName), methodsState);
                // let texts;
                var options = {};
                // TODO: Support options
                if (node.arguments && node.arguments.length > 1) {
                    var optionsNode = node.arguments[1];
                    options = babelUtils_1.collectOptions(t, optionsNode, babelUtils_1.ValidTrOptions);
                }
                // for (const key in FbtBooleanOptions) {
                //   if (options.hasOwnProperty(key)) {
                //     options[key] = getOptionBooleanValue(t, options, key, optionsNode);
                //   }
                // }
                // if (options.doNotExtract) {
                //   return;
                // }
                var text = {
                    text: babelUtils_1.normalizeSpaces(babelUtils_1.expandStringConcat(t, node.arguments[0]).value, options).trim(),
                    plaintextOnly: true
                };
                addPhrase(node, text, visitor);
                // const desc = normalizeSpaces(
                //   expandStringConcat(moduleName, t, node.arguments[1]).value,
                //   options
                // ).trim();
                // const phrase = {
                //   type: isTable ? FbtType.TABLE : FbtType.TEXT,
                //   desc: desc
                // };
                // if (options.subject) {
                //   texts.unshift({
                //     type: "subject"
                //   });
                //   runtimeArgs.unshift(
                //     t.callExpression(
                //       t.memberExpression(
                //         t.identifier(moduleName),
                //         t.identifier("_subject"),
                //         false
                //       ),
                //       [getOptionAST(node.arguments[2], "subject")]
                //     )
                //   );
                // }
                // appendOptions(phrase, options);
                // phrase.jsfbt = JSFbtBuilder.build(
                //   phrase.type,
                //   texts,
                //   visitor.opts.reactNativeMode
                // );
                // if (visitor.opts.collectFbt) {
                //   if (visitor.opts.auxiliaryTexts) {
                //     phrase.texts = texts;
                //   }
                //   addPhrase(node, phrase, visitor);
                // TODO uncomment here
                //   if (node.parentIndex !== undefined) {
                //     addEnclosingString(trFunctionCalls.length - 1, node.parentIndex);
                //   }
                // }
                // const argsOutput = JSON.stringify({
                //   type: phrase.type,
                //   jsfbt: phrase.jsfbt,
                //   desc: phrase.desc,
                //   project: phrase.project
                // });
                // const encodedOutput = visitor.opts.fbtBase64
                //   ? Buffer.from(argsOutput).toString("base64")
                //   : argsOutput;
                // const args = [
                //   t.stringLiteral(
                //     visitor.opts.fbtSentinel + encodedOutput + visitor.opts.fbtSentinel
                //   )
                // ];
                // if (runtimeArgs.length > 0) {
                //   args.push(t.arrayExpression(runtimeArgs));
                // }
            }
        }
    };
    // /**
    //  * Transform a namespaced fbt JSXElement (or its React equivalent) into a
    //  * method call. E.g. `<fbt:param>` or <FbtParam> to `fbt.param()`
    //  */
    // function transformNamespacedFbtElement(moduleName, node) {
    //   switch (node.type) {
    //     case "JSXElement":
    //       return toFbtNamespacedCall(moduleName, node);
    //     case "JSXText":
    //       return t.stringLiteral(normalizeSpaces(node.value));
    //     case "JSXExpressionContainer":
    //       return t.stringLiteral(
    //         normalizeSpaces(
    //           expandStringConcat(moduleName, t, node.expression).value
    //         )
    //       );
    //     default:
    //       throwAt(node, `Unknown namespace fbt type ${node.type}`);
    //   }
    // }
    // function toFbtNamespacedCall(moduleName, node) {
    //   let name = validateNamespacedFbtElement(
    //     moduleName,
    //     node.openingElement.name
    //   );
    //   const args = namespacedElementsArgsHandler
    //     .getArgs(moduleName, t)
    //     [name](node);
    //   if (name == "implicitParamMarker") {
    //     name = "param";
    //   }
    //   return t.callExpression(
    //     t.memberExpression(t.identifier(moduleName), t.identifier(name), false),
    //     args
    //   );
    // }
    /**
     * Extracts texts that contains variations or enums, contatenating
     * literal parts. Example:
     *
     * "Hello, " + fbt.param('user', user, {gender: 'male'}) + "! " +
     * "Your score is " + fbt.param('score', score) + "!"
     *
     * ["Hello, ", {type: 'gender', token: 'user'}, "! Your score is {score}!"]
     */
    // function extractTableTexts(moduleName, src, node, variations, texts) {
    //   texts || (texts = []);
    //   if (node.type === "BinaryExpression") {
    //     if (node.operator !== "+") {
    //       throwAt(
    //         node,
    //         `Expected concatenation operator (+) but got ${node.operator}`
    //       );
    //     }
    //     extractTableTexts(moduleName, src, node.left, variations, texts);
    //     extractTableTexts(moduleName, src, node.right, variations, texts);
    //   } else if (node.type === "TemplateLiteral") {
    //     let index = 0;
    //     for (const elem of node.quasis) {
    //       if (elem.value.cooked) {
    //         extractTableTexts(
    //           moduleName,
    //           src,
    //           t.stringLiteral(elem.value.cooked),
    //           variations,
    //           texts
    //         );
    //       }
    //       if (index < node.expressions.length) {
    //         const expr = node.expressions[index++];
    //         extractTableTexts(moduleName, src, expr, variations, texts);
    //       }
    //     }
    //   } else if (node.type === "StringLiteral") {
    //     // If we already collected a literal part previously, and
    //     // current part is a literal as well, just concatenate them.
    //     const previousText = texts[texts.length - 1];
    //     if (typeof previousText === "string") {
    //       texts[texts.length - 1] = normalizeSpaces(previousText + node.value);
    //     } else {
    //       texts.push(node.value);
    //     }
    //   } else if (node.type === "CallExpression") {
    //     const callee = node.callee.property;
    //     switch (callee.name || callee.value) {
    //       case "param":
    //         texts.push(variations[node.arguments[0].value]);
    //         break;
    //       case "enum":
    //         texts.push({
    //           type: "enum",
    //           range: extractEnumRange(node.arguments[1]),
    //           value: getRawSource(src, node.arguments[0])
    //         });
    //         break;
    //       case "plural":
    //         const singular = node.arguments[0].value;
    //         const opts = collectOptions(
    //           moduleName,
    //           t,
    //           node.arguments[2],
    //           ValidPluralOptions
    //         );
    //         const defaultToken =
    //           opts.showCount && opts.showCount !== "no"
    //             ? PLURAL_PARAM_TOKEN
    //             : null;
    //         if (opts.showCount === "ifMany" && !opts.many) {
    //           throwAt(
    //             node,
    //             "The 'many' attribute must be set explicitly if showing count only " +
    //               " on 'ifMany', since the singular form presumably starts with an article"
    //           );
    //         }
    //         const data = {
    //           type: "plural",
    //           showCount: "no",
    //           name: defaultToken,
    //           singular: singular,
    //           many: singular + "s",
    //           ...opts
    //         };
    //         if (data.showCount !== "no") {
    //           if (data.showCount === "yes") {
    //             data.singular = "1 " + data.singular;
    //           }
    //           data.many = "{" + data.name + "} " + data.many;
    //         }
    //         texts.push(data);
    //         break;
    //       case "pronoun":
    //         // Usage: fbt.pronoun(usage, gender [, options])
    //         const optionsNode = node.arguments[2];
    //         const options = collectOptions(
    //           moduleName,
    //           t,
    //           node.arguments[2],
    //           ValidPronounOptions
    //         );
    //         for (const key of Object.keys(options)) {
    //           options[key] = getOptionBooleanValue(t, options, key, optionsNode);
    //         }
    //         texts.push({
    //           type: "pronoun",
    //           usage: node.arguments[0].value,
    //           ...options
    //         });
    //         break;
    //       case "name":
    //         texts.push(variations[node.arguments[0].value]);
    //         break;
    //     }
    //   }
    //   return texts;
    // }
    /**
     * Given an array of nodes, recursively construct a concatenation of all
     * these nodes.
     */
    // function createConcatFromExpressions(nodes) {
    //   if (nodes.length === 0) {
    //     throw new Error(`Cannot create an expression without nodes.`);
    //   }
    //   return nodes.reduceRight(function(rest, node) {
    //     return t.binaryExpression("+", node, rest);
    //   });
    // }
    /**
     * fbt.c(text) --> fbt(text, desc)
     */
    // function processFbtCommonCall(moduleName, path) {
    //   if (path.node.arguments.length !== 1) {
    //     throwAt(
    //       path.node,
    //       `Expected ${moduleName} to have exactly 1 argument. ${
    //         path.node.arguments.length
    //       } was given.`
    //     );
    //   }
    //   const text = normalizeSpaces(
    //     expandStringConcat(moduleName, t, path.node.arguments[0]).value
    //   ).trim();
    //   const desc = FbtCommonConstants[text];
    //   if (!desc) {
    //     throwAt(path.node, getUnknownCommonStringErrorMessage(moduleName, text));
    //   }
    //   const callNode = t.callExpression(t.identifier(moduleName), [
    //     t.stringLiteral(text),
    //     t.stringLiteral(desc)
    //   ]);
    //   callNode.loc = path.node.loc;
    //   path.replaceWith(callNode);
}
exports["default"] = LangBabelPlugin;
function getExtractedStrings() {
    return trFunctionCalls;
}
exports.getExtractedStrings = getExtractedStrings;
function getChildToParentRelationships() {
    return childToParent || {};
}
exports.getChildToParentRelationships = getChildToParentRelationships;
function getDefaultOptions() {
    return defaultOptions;
}
exports.getDefaultOptions = getDefaultOptions;
// function initExtraOptions(state) {
//   Object.assign(ValidFbtOptions, state.opts.extraOptions || {});
// }
// function initDefaultOptions(state) {
//   defaultOptions = {};
//   const fbtDocblockOptions = docblock.getFromState(state).fbt;
//   if (fbtDocblockOptions) {
//     defaultOptions = JSON.parse(fbtDocblockOptions);
//     Object.keys(defaultOptions).forEach(o => checkOption(o, ValidFbtOptions));
//   }
//   if (!defaultOptions.project) {
//     defaultOptions.project = "";
//   }
// }
// function getDescAttributeValue(moduleName, node) {
//   const descAttr = getAttributeByNameOrThrow(
//     node.openingElement.attributes,
//     "desc"
//   );
//   if (!descAttr) {
//     throw new Error(`<${moduleName}> requires a "desc" attribute`);
//   }
//   if (descAttr.value.type === "JSXExpressionContainer") {
//     return descAttr.value.expression;
//   }
//   return descAttr.value;
// }
// function getCommonAttributeValue(moduleName, node) {
//   const commonAttr = getAttributeByName(
//     node.openingElement.attributes,
//     "common"
//   );
//   if (!commonAttr) {
//     return null;
//   }
//   if (commonAttr.value.type === "JSXExpressionContainer") {
//     const expression = commonAttr.value.expression;
//     if (expression.type === "BooleanLiteral") {
//       return expression;
//     }
//   }
//   throw new Error(
//     `\`common\` attribute for <${moduleName}> requires boolean literal`
//   );
// }
/**
 * Appends additional options to the main
 * fbt call argument.
 */
// function appendOptions(fbtArg, options) {
//   Object.assign(fbtArg, defaultOptions, options);
// }
/**
 * Returns the AST node associated with the key provided, or null if it doesn't exist.
 */
function getOptionAST(options, name) {
    var props = (options && options.properties) || [];
    for (var ii = 0; ii < props.length; ii++) {
        var option = props[ii];
        var curName = option.key.name || option.key.value;
        if (name === curName) {
            return option.value.expression || option.value;
        }
    }
    return null;
}
/**
 * Normalizes first and last elements in the
 * table texts by triming them left and right accordingly.
 * [" Hello, ", {enum}, " world! "] -> ["Hello, ", {enum}, " world!"]
 */
function normalizeTableTexts(texts) {
    var firstText = texts[0];
    if (firstText && typeof firstText === "string") {
        texts[0] = firstText.trimLeft();
    }
    var lastText = texts[texts.length - 1];
    if (lastText && typeof lastText === "string") {
        texts[texts.length - 1] = lastText.trimRight();
    }
    return texts;
}
/** Given a node, and its index location in trFunctionCalls, any children of the given
 * node that are implicit are given their parent's location. This can then
 * be used to link the inner strings with their enclosing string.
 */
function giveParentPhraseLocation(parentNode, parentIdx) {
    if (!parentNode.children) {
        return;
    }
    for (var ii = 0; ii < parentNode.children.length; ++ii) {
        var child = parentNode.children[ii];
        if (child.implicitDesc) {
            child.parentIndex = parentIdx;
        }
    }
}
function addPhrase(node, phrase, visitor) {
    trFunctionCalls.push({
        sourceFileName: visitor.opts.filepath,
        line: node.loc.start.line,
        character: node.loc.start.column,
        text: phrase.text,
        plaintextOnly: phrase.plaintextOnly
    });
}
function addEnclosingString(childIdx, parentIdx) {
    childToParent[childIdx] = parentIdx;
}
function getUnknownCommonStringErrorMessage(moduleName, text) {
    return "Unknown string \"" + text + "\" for <" + moduleName + " common={true}>";
}
//# sourceMappingURL=LangBabelPlugin.js.map