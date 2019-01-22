import { TranslateFunctionCall } from '../types';
export default function LangBabelPlugin(babel: any): {
    pre(): void;
    name: string;
    visitor: {
        JSXElement(path: any, state: any): void;
        CallExpression(path: any, state: any): void;
    };
};
export declare function getExtractedStrings(): TranslateFunctionCall[];
export declare function getChildToParentRelationships(): {};
export declare function getDefaultOptions(): any;
