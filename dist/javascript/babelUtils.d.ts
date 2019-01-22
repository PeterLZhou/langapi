import { Dict } from '../utils';
import { Node } from '@babel/core';
export declare function throwAt(astNode: any, msg: string): void;
export declare function filterEmptyNodes(nodes: any[]): any[];
export declare function isRequireAlias(path: any): boolean;
export declare function collectOptions(t: any, options: Dict, validOptions: Dict): {};
export declare function expandStringConcat(t: any, node: Node): any;
export declare function normalizeSpaces(value: string, options?: Dict): string;
export declare const ValidTrOptions: {
    project: boolean;
    author: boolean;
    preserveWhitespace: boolean;
    subject: boolean;
    common: boolean;
    doNotExtract: boolean;
};
