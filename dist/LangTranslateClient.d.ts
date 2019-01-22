export default function LangClient(apiKey: string, translations: any, config: any): LangTranslateClient;
declare class LangTranslateClient {
    apiKey: string;
    translations: {
        [languagePair: string]: {
            [originalText: string]: string;
        };
    };
    config: {
        [key: string]: any;
    };
    constructor(apiKey: string | undefined, translations: any, config: any);
    tr(phrase: string): any;
}
export {};
