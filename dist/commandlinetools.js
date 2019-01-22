"use strict";
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
var ora = require("ora");
var chalk_1 = require("chalk");
var LangFileClient_1 = require("./LangFileClient");
var TranslationClient_1 = require("./TranslationClient");
var dotenv_1 = require("dotenv");
var child_process_1 = require("child_process");
var printUtils_1 = require("./printUtils");
var spinner = null;
function loadEnvAndGetContent() {
    dotenv_1.config();
    if (!process.env.LANG_KEY) {
        throw new Error("Couldn't find environment variable LANG_KEY");
    }
    return { LANG_KEY: process.env.LANG_KEY };
}
function init(sourceDir, ts) {
    return __awaiter(this, void 0, void 0, function () {
        var spinner;
        return __generator(this, function (_a) {
            spinner = ora("Installing langapi...");
            spinner.start();
            child_process_1.execSync("npm install --save langapi");
            spinner.stop();
            spinner.start("Initializing lang API files...");
            LangFileClient_1["default"].init(sourceDir, ts);
            spinner.stop();
            return [2 /*return*/];
        });
    });
}
exports.init = init;
function pull(sourceDir) {
    return __awaiter(this, void 0, void 0, function () {
        var LANG_KEY, translationClient, spinner, response, completedTranslations, langFileClient, translationsJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LANG_KEY = loadEnvAndGetContent().LANG_KEY;
                    translationClient = new TranslationClient_1["default"](sourceDir, LANG_KEY);
                    spinner = ora("Retrieving completed translations");
                    spinner.start();
                    return [4 /*yield*/, translationClient.receiveCompletedTranslations()];
                case 1:
                    response = _a.sent();
                    completedTranslations = response.data.receiveCompletedTranslations;
                    spinner.stop();
                    spinner.start("Caching completed translations locally");
                    langFileClient = new LangFileClient_1["default"](sourceDir);
                    translationsJson = constructTranslationJsonFromResponse(completedTranslations);
                    langFileClient.updateTranslations(translationsJson);
                    spinner.stop();
                    // TODO print out all the new translations (do a diff)
                    console.log("Finished updating translations. There are now " +
                        completedTranslations.length +
                        " translated texts.");
                    return [2 /*return*/];
            }
        });
    });
}
exports.pull = pull;
function constructTranslationJsonFromResponse(completedTranslations) {
    var translationJson = {};
    completedTranslations.forEach(function (translationText) {
        if (translationJson[translationText.originalLang] === undefined) {
            translationJson[translationText.originalLang] = {};
        }
        if (translationJson[translationText.originalLang][translationText.newLang] ===
            undefined) {
            translationJson[translationText.originalLang][translationText.newLang] = {};
        }
        translationJson[translationText.originalLang][translationText.newLang][translationText.originalText] = translationText.newText;
    });
    return translationJson;
}
function push(sourceDir, isTypescript) {
    return __awaiter(this, void 0, void 0, function () {
        var LANG_KEY, translationClient, langFileClient, translateCalls, _a, validTranslationCalls, invalidTranslationCalls, formattedValidTranslationCalls, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    LANG_KEY = loadEnvAndGetContent().LANG_KEY;
                    translationClient = new TranslationClient_1["default"](sourceDir, LANG_KEY);
                    langFileClient = new LangFileClient_1["default"](sourceDir);
                    spinner = ora("Scanning for translate calls");
                    spinner.start();
                    return [4 /*yield*/, translationClient.compileProgramAndFindTranslateCalls(sourceDir, isTypescript)];
                case 1:
                    translateCalls = _b.sent();
                    spinner.stop();
                    spinner.start("Sending requests and getting new translations");
                    return [4 /*yield*/, translationClient.requestTranslations(translateCalls, langFileClient)];
                case 2:
                    _a = _b.sent(), validTranslationCalls = _a.validTranslationCalls, invalidTranslationCalls = _a.invalidTranslationCalls;
                    formattedValidTranslationCalls = formatValidTranslationCalls(validTranslationCalls);
                    spinner.stop();
                    console.log("");
                    if (validTranslationCalls.length > 0) {
                        console.log(chalk_1["default"].green("Valid translation calls:"));
                        validTranslationCalls.forEach(function (translateCall) {
                            printUtils_1.printTranslateCall(translateCall, chalk_1["default"].green);
                        });
                    }
                    else {
                        console.log(chalk_1["default"].green("No new valid translation calls."));
                    }
                    console.log("");
                    if (invalidTranslationCalls.length > 0) {
                        console.log(chalk_1["default"].red("Invalid translation calls:"));
                        invalidTranslationCalls.forEach(function (translateCall) {
                            printUtils_1.printTranslateCall(translateCall, chalk_1["default"].red);
                        });
                    }
                    console.log("");
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    if (spinner) {
                        spinner.stop();
                    }
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.push = push;
function formatValidTranslationCalls(validTranslationCalls) {
    return {};
}
//# sourceMappingURL=commandlinetools.js.map