"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var apollo_boost_1 = require("apollo-boost");
var createTypescriptProgram_1 = require("./typescript/createTypescriptProgram");
var node_fetch_1 = require("node-fetch");
var graphql_tag_1 = require("graphql-tag");
var LangTrCollector_1 = require("./javascript/LangTrCollector");
var LangTrCollector_2 = require("./typescript/LangTrCollector");
var utils_1 = require("./utils");
var getJavascriptSourceFiles_1 = require("./javascript/getJavascriptSourceFiles");
var getTypescriptSourceFiles_1 = require("./typescript/getTypescriptSourceFiles");
var errors_1 = require("./errors");
var REQUEST_TRANSLATION = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation RequestTranslation(\n    $requests: [TranslationRequestInput!]!\n    $apiKey: String!\n  ) {\n    requestTranslations(requests: $requests, apiKey: $apiKey) {\n      originalText\n      originalLang\n      newLang\n    }\n  }\n"], ["\n  mutation RequestTranslation(\n    $requests: [TranslationRequestInput!]!\n    $apiKey: String!\n  ) {\n    requestTranslations(requests: $requests, apiKey: $apiKey) {\n      originalText\n      originalLang\n      newLang\n    }\n  }\n"])));
var RECEIVE_COMPLETED_TRANSLATIONS = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query ReceieveCompletedTranslation($apiKey: String!) {\n    receiveCompletedTranslations(apiKey: $apiKey) {\n      originalLang\n      newLang\n      originalText\n      newText\n    }\n  }\n"], ["\n  query ReceieveCompletedTranslation($apiKey: String!) {\n    receiveCompletedTranslations(apiKey: $apiKey) {\n      originalLang\n      newLang\n      originalText\n      newText\n    }\n  }\n"])));
var TranslationClient = /** @class */ (function () {
    function TranslationClient(sourceDir, apiKey) {
        var _this = this;
        this.compileProgramAndFindTranslateCalls = function (sourceDir, isTypescript) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, isTypescript
                        ? this.compileTypescriptProgramAndFindTranslateCalls(sourceDir)
                        : this.compileJavascriptProgramAndFindTranslateCalls(sourceDir)];
            });
        }); };
        this.compileTypescriptProgramAndFindTranslateCalls = function (sourceDir) { return __awaiter(_this, void 0, void 0, function () {
            var programFiles, program, translateCalls;
            return __generator(this, function (_a) {
                programFiles = getTypescriptSourceFiles_1.getTypescriptSourceFiles(sourceDir);
                program = createTypescriptProgram_1["default"](programFiles);
                translateCalls = program
                    .getSourceFiles()
                    .filter(function (sourceFile) {
                    return programFiles.indexOf(sourceFile.fileName) >= 0;
                })
                    .map(function (sourceFile) {
                    return LangTrCollector_2.findTranslateCalls(sourceFile, sourceFile);
                });
                return [2 /*return*/, utils_1.flattenArray(translateCalls)];
            });
        }); };
        this.compileJavascriptProgramAndFindTranslateCalls = function (sourceDir) { return __awaiter(_this, void 0, void 0, function () {
            var sourceFiles, langTrCollector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sourceFiles = getJavascriptSourceFiles_1.getJavascriptSourceFiles(sourceDir);
                        langTrCollector = new LangTrCollector_1["default"]();
                        return [4 /*yield*/, langTrCollector.collectFromAllFiles(sourceFiles)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.requestTranslations = function (translateCalls, langFileClient) { return __awaiter(_this, void 0, void 0, function () {
            var _a, translationRequests, 
            // we substitute valid with unique received from the server
            validTranslationCalls, invalidTranslationCalls, payload, uniqueTranslationRequests, uniqueTranslationCalls, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this.getValidTranslationRequests(translateCalls, langFileClient), translationRequests = _a.translationRequests, validTranslationCalls = _a.validTranslationCalls, invalidTranslationCalls = _a.invalidTranslationCalls;
                        return [4 /*yield*/, this.apolloClient
                                .mutate({
                                mutation: REQUEST_TRANSLATION,
                                variables: {
                                    requests: translationRequests,
                                    apiKey: this.apiKey
                                }
                            })["catch"](function (err) {
                                errors_1.handleGraphQLError(err);
                            })];
                    case 1:
                        payload = _b.sent();
                        uniqueTranslationRequests = payload && payload.data ? payload.data.requestTranslations : [];
                        uniqueTranslationCalls = this.getUniqueTranslationCalls(validTranslationCalls, uniqueTranslationRequests);
                        return [2 /*return*/, {
                                validTranslationCalls: uniqueTranslationCalls,
                                invalidTranslationCalls: invalidTranslationCalls
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getValidTranslationRequests = function (translateCalls, langFileClient) {
            var translationRequests = [];
            var validTranslationCalls = [];
            var invalidTranslationCalls = [];
            translateCalls.forEach(function (translateCall) {
                if (translateCall.plaintextOnly && translateCall.text) {
                    // TODO figure out languages
                    validTranslationCalls.push(translateCall);
                    langFileClient.config.targetLanguages.forEach(function (targetLanguage) {
                        translationRequests.push({
                            originalText: translateCall.text,
                            originalLang: langFileClient.config.originalLanguage,
                            newLang: targetLanguage
                        });
                    });
                }
                else {
                    invalidTranslationCalls.push(translateCall);
                }
            });
            return {
                translationRequests: translationRequests,
                validTranslationCalls: validTranslationCalls,
                invalidTranslationCalls: invalidTranslationCalls
            };
        };
        this.receiveCompletedTranslations = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.apolloClient.query({
                        query: RECEIVE_COMPLETED_TRANSLATIONS,
                        variables: {
                            apiKey: this.apiKey
                        }
                    })];
            });
        }); };
        this.getUniqueTranslationCalls = function (validTranslationCall, uniqueTranslationRequests) {
            return validTranslationCall;
        };
        this.sourceDir = sourceDir;
        this.apiKey = apiKey;
        this.apolloClient = new apollo_boost_1["default"]({
            uri: utils_1.getBackendUrl(),
            fetch: node_fetch_1["default"]
        });
    }
    return TranslationClient;
}());
exports["default"] = TranslationClient;
var templateObject_1, templateObject_2;
//# sourceMappingURL=TranslationClient.js.map