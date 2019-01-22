import * as ts from 'typescript';
export default function (opts?: any): (ctx: ts.TransformationContext) => ts.Transformer<any>;
