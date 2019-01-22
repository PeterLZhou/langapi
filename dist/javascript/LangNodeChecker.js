"use strict";
exports.__esModule = true;
var babelUtils_1 = require("./babelUtils");
var TR = "tr";
var LangNodeChecker = /** @class */ (function () {
    function LangNodeChecker() {
    }
    LangNodeChecker.isJSXElement = function (node) {
        if (node.type !== "JSXElement") {
            return false;
        }
        var nameNode = node.openingElement.name;
        return (nameNode.type === "JSXIdentifier" &&
            LangNodeChecker.isTrName(nameNode.name));
    };
    LangNodeChecker.isJSXNamespacedElement = function (node) {
        if (node.type !== "JSXElement") {
            return false;
        }
        var nameNode = node.openingElement.name;
        return (nameNode.type === "JSXNamespacedName" &&
            LangNodeChecker.isTrName(nameNode.namespace.name));
    };
    //Check if the js module is imported
    LangNodeChecker.isJSModuleBound = function (path) {
        var binding = path.context.scope.getBinding("langapi");
        return !!(binding && binding.path.node);
    };
    LangNodeChecker.isModuleCall = function (node) {
        return (node.callee.type === "Identifier" &&
            LangNodeChecker.isTrName(node.callee.name));
    };
    LangNodeChecker.isMemberExpression = function (node) {
        return (node.type === "MemberExpression" &&
            LangNodeChecker.isTrName(node.object.name));
    };
    // Do i need this
    // isJSModuleBound(path) {
    //   const binding = path.context.scope.getBinding(this._moduleName);
    //   return !!(binding && binding.path.node);
    // }
    /**
     * Ensure that, given an <fbt/fbs> JSXElement, we don't have any nested <fbt/fbs> element.
     * And also checks that all "parameter" child elements follow the same namespace.
     * E.g.
     * Inside <fbt>, don't allow <fbs:param>.
     * Inside <fbs>, don't allow <fbt:param>.
     */
    LangNodeChecker.assertNoNestedTrs = function (node) {
        var _this = this;
        node.children.forEach(function (child) {
            if (_this.isJSXElement(child) || _this.isJSXElement(child)) {
                babelUtils_1.throwAt(child, "Don't nest tr function calls. This is redundant. " +
                    "The text is already translated so you don't need to translate it again");
            }
            else {
                if (_this.isJSXNamespacedElement(child)) {
                    var childOpeningElementNode = child.openingElement.name;
                    babelUtils_1.throwAt(child, "Error found at " + childOpeningElementNode + ", not sure why this fires in our tr structure.");
                }
            }
        });
    };
    LangNodeChecker.isTrName = function (name) {
        return name === TR;
    };
    LangNodeChecker.COMMON_STRING_METHOD_NAME = "c";
    return LangNodeChecker;
}());
exports["default"] = LangNodeChecker;
//# sourceMappingURL=LangNodeChecker.js.map