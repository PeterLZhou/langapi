export declare type TranslateFunctionCall = {
    text: string;
    sourceFileName: string;
    line: number;
    character: number;
    plaintextOnly: boolean;
};
export declare type TranslationRequest = {
    originalText: string;
    originalLang: string;
    newLang: string;
};
export declare type TranslationText = {
    originalText: string;
    originalLang: string;
    newText: string;
    newLang: string;
};
