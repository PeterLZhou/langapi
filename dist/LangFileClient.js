"use strict";
exports.__esModule = true;
var fs = require("fs");
var utils_1 = require("./utils");
var LanguageTable_1 = require("./LanguageTable");
var LangFileClient = /** @class */ (function () {
    function LangFileClient(sourceDirectory) {
        // TODO figure out what we need for config (default langauges, starting language, etc)
        this.config = {};
        this.translations = {};
        this.sourceDir = sourceDirectory;
        this.loadConfig();
        this.loadTranslations();
        this.verifyOriginalLanguage();
        this.verifyTargetLanguages();
    }
    LangFileClient.init = function (sourceDir, typescript) {
        this.createLangDirectoryIfMissing(sourceDir);
        this.createConfigIfMissing(sourceDir);
        this.createTranslationsFileIfMissing(sourceDir);
        this.fillTranslationsFileWithDefaults(sourceDir);
        this.createLangClientIfMissing(sourceDir, typescript);
    };
    LangFileClient.fillTranslationsFileWithDefaults = function (sourceDir) {
        console.log("Writing default config into " + utils_1.absolutePath(sourceDir, ".lang/langconfig.json") + ", please add specified target langauges.");
        fs.writeFileSync(utils_1.absolutePath(sourceDir, ".lang/langconfig.json"), JSON.stringify({
            originalLanguage: "en",
            targetLanguages: []
        }));
    };
    LangFileClient.prototype.loadConfig = function () {
        this.config = this.readLangJsonFile("langconfig.json");
    };
    LangFileClient.prototype.loadTranslations = function () {
        this.translations = this.readLangJsonFile("translations.json");
    };
    LangFileClient.prototype.updateTranslations = function (translations) {
        this.translations = translations;
        fs.writeFileSync(utils_1.absolutePath(this.sourceDir, ".lang/translations.json"), JSON.stringify(this.translations));
    };
    LangFileClient.createLangDirectoryIfMissing = function (sourceDir) {
        if (!fs.existsSync(utils_1.absolutePath(sourceDir, ".lang"))) {
            console.log("No existing .lang directory, creating...");
            fs.mkdirSync(utils_1.absolutePath(sourceDir, ".lang"));
        }
    };
    LangFileClient.createLangDirFileIfMissing = function (sourceDir, filename) {
        if (!fs.existsSync(utils_1.absolutePath(sourceDir, ".lang/" + filename))) {
            console.log("No existing " + filename + ", creating...");
            fs.writeFileSync(utils_1.absolutePath(sourceDir, ".lang/" + filename), JSON.stringify({}));
        }
    };
    LangFileClient.createConfigIfMissing = function (sourceDir) {
        this.createLangDirFileIfMissing(sourceDir, "langconfig.json");
    };
    LangFileClient.createTranslationsFileIfMissing = function (sourceDir) {
        this.createLangDirFileIfMissing(sourceDir, "translations.json");
    };
    LangFileClient.prototype.readLangJsonFile = function (filename) {
        return require(utils_1.absolutePath(this.sourceDir, ".lang/" + filename));
    };
    LangFileClient.createLangClientIfMissing = function (sourceDir, typescript) {
        var fileName = typescript ? "LangClient.ts" : "LangClient.js";
        var fileContent = typescript
            ? utils_1.TypescriptLangClient
            : utils_1.JavascriptLangClient;
        if (!fs.existsSync(utils_1.absolutePath(sourceDir, fileName))) {
            console.log("No existing " + utils_1.absolutePath(sourceDir, fileName) + ", creating...");
            fs.writeFileSync(utils_1.absolutePath(sourceDir, fileName), fileContent);
        }
    };
    LangFileClient.prototype.verifyOriginalLanguage = function () {
        if (!this.config.originalLanguage) {
            throw new Error("No original language specified inside " + utils_1.absolutePath(this.sourceDir, ".lang/langconfig.json") + "\\n\n Specify original language with: \n{\n\t...\n\toriginalLanguage: \"language\"\n}");
        }
        else if (!LanguageTable_1.languages[this.config.originalLanguage]) {
            throw new Error("originalLanguage " + this.config.originalLanguage + " does not match a valid language code. See TODO:URL for valid language codes.");
        }
    };
    LangFileClient.prototype.verifyTargetLanguages = function () {
        if (!this.config.targetLanguages || !this.config.targetLanguages.length) {
            console.warn("No target languages specified inside " + utils_1.absolutePath(this.sourceDir, ".lang/langconfig.json") + "\n\n Specify target languages with: \n{\n\t...\n\ttargetLanguages: [\"language_one\", \"language_two\"...]\n}");
        }
        else {
            this.config.targetLanguages.forEach(function (targetLanguage) {
                if (!LanguageTable_1.languages[targetLanguage]) {
                    console.warn("target language \"" + targetLanguage + "\" does not match a valid language code. See TODO:URL for valid language codes.");
                }
            });
        }
    };
    return LangFileClient;
}());
exports["default"] = LangFileClient;
//# sourceMappingURL=LangFileClient.js.map