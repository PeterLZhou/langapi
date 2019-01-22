export default class LangFileClient {
    config: {
        [key: string]: any;
    };
    translations: {
        [languagePair: string]: {
            [originalText: string]: string;
        };
    };
    sourceDir: string;
    constructor(sourceDirectory: string);
    static init(sourceDir: string, typescript: boolean): void;
    static fillTranslationsFileWithDefaults(sourceDir: string): void;
    loadConfig(): void;
    loadTranslations(): void;
    updateTranslations(translations: {
        [languagePair: string]: {
            [originalText: string]: string;
        };
    }): void;
    private static createLangDirectoryIfMissing;
    private static createLangDirFileIfMissing;
    private static createConfigIfMissing;
    private static createTranslationsFileIfMissing;
    private readLangJsonFile;
    private static createLangClientIfMissing;
    verifyOriginalLanguage(): void;
    verifyTargetLanguages(): void;
}
