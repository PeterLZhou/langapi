import { TranslateFunctionCall } from '../types';
export default class LangTrCollector {
    transformOneFile: (sourceCode: string, filepath: string) => TranslateFunctionCall[] | undefined;
    collectFromAllFiles: (sourceFiles: string[]) => Promise<TranslateFunctionCall[]>;
    collectFromOneFile: (sourceFile: string) => Promise<TranslateFunctionCall[]>;
}
