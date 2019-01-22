import ApolloClient from "apollo-boost";
import LangFileClient from "./LangFileClient";
import { TranslateFunctionCall, TranslationRequest } from "./types";
export default class TranslationClient {
    sourceDir: string;
    apolloClient: ApolloClient<any>;
    apiKey: string;
    constructor(sourceDir: string, apiKey: string);
    compileProgramAndFindTranslateCalls: (sourceDir: string, isTypescript: boolean) => Promise<TranslateFunctionCall[]>;
    compileTypescriptProgramAndFindTranslateCalls: (sourceDir: string) => Promise<TranslateFunctionCall[]>;
    compileJavascriptProgramAndFindTranslateCalls: (sourceDir: string) => Promise<TranslateFunctionCall[]>;
    requestTranslations: (translateCalls: TranslateFunctionCall[], langFileClient: LangFileClient) => Promise<{
        validTranslationCalls: TranslateFunctionCall[];
        invalidTranslationCalls: TranslateFunctionCall[];
    }>;
    getValidTranslationRequests: (translateCalls: TranslateFunctionCall[], langFileClient: LangFileClient) => {
        translationRequests: TranslationRequest[];
        validTranslationCalls: TranslateFunctionCall[];
        invalidTranslationCalls: TranslateFunctionCall[];
    };
    receiveCompletedTranslations: () => Promise<any>;
    getUniqueTranslationCalls: (validTranslationCall: TranslateFunctionCall[], uniqueTranslationRequests: TranslationRequest[]) => TranslateFunctionCall[];
}
