export default class LangNodeChecker {
    static COMMON_STRING_METHOD_NAME: string;
    static isJSXElement(node: any): boolean;
    static isJSXNamespacedElement(node: any): boolean;
    static isJSModuleBound(path: any): boolean;
    static isModuleCall(node: any): boolean;
    static isMemberExpression(node: any): boolean;
    /**
     * Ensure that, given an <fbt/fbs> JSXElement, we don't have any nested <fbt/fbs> element.
     * And also checks that all "parameter" child elements follow the same namespace.
     * E.g.
     * Inside <fbt>, don't allow <fbs:param>.
     * Inside <fbs>, don't allow <fbt:param>.
     */
    static assertNoNestedTrs(node: any): void;
    static isTrName(name: any): boolean;
}
