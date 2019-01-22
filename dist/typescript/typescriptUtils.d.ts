import { CallExpression, Node, SourceFile } from 'typescript';
import { Dict } from '../utils';
export declare function throwAt(node: Node, sourceFile: SourceFile, msg: string): void;
export declare function assertCorrectNumberOfArguments(node: CallExpression, sourceFile: SourceFile): void;
export declare function expandStringConcat(node: Node, sourceFile: SourceFile): any;
export declare function isTranslateCallExpression(node: Node): boolean;
export declare function containsOnlyPlaintext(node: Node): any;
export declare function normalizeSpaces(value: string, options?: Dict): string;
