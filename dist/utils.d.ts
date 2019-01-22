/// <reference types="node" />
export declare function sh(cmd: any): Promise<{
    stdout: string | null;
    stderr: string | null;
}>;
export declare function getBackendUrl(): string;
export declare function absolutePath(sourceDir: string, fileName?: string): string;
export declare const TypescriptLangClient = "import LangTranslateClient from 'langapi';\n\nconst LangClient = LangTranslateClient(\n  process.env.LANG_KEY,\n  require(\"./.lang/translations.json\"),\n  require(\"./.lang/langconfig.json\")\n);\n\nexport function tr(phrase: string) {\n  return LangClient.tr(phrase);\n};\n";
export declare const JavascriptLangClient = "var LangClient = require('langapi')(\n  process.env.LANG_KEY,\n  require(\"./.lang/translations.json\"),\n  require(\"./.lang/langconfig.json\")\n);\n\nexport function tr(phrase) {\n  return LangClient.tr(phrase);\n};\n";
export declare const lines: (newlined: string | Buffer) => string[];
export declare function flattenArray<T>(array: T[][]): T[];
export declare type Dict = {
    [key: string]: any;
};
