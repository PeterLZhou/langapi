"use strict";
exports.__esModule = true;
var LanguageTable_1 = require("./LanguageTable");
function LangClient(apiKey, translations, config) {
    return new LangTranslateClient(apiKey, translations, config);
}
exports["default"] = LangClient;
var LangTranslateClient = /** @class */ (function () {
    function LangTranslateClient(apiKey, translations, config) {
        this.translations = {};
        this.config = {};
        this.apiKey = apiKey || "";
        this.translations = translations;
        this.config = config;
    }
    LangTranslateClient.prototype.tr = function (phrase) {
        if (this.translations) {
            var originalLanguage = this.config.originalLanguage;
            // Chrome
            if (navigator && navigator.languages) {
                for (var i = 0; i < navigator.languages.length; i++) {
                    if (navigator.languages[i] == originalLanguage) {
                        return phrase;
                    }
                    // If certain translations are incomplete this will render a multilingual site which is shit LOL
                    if (LanguageTable_1.chromeToLanguageMapping[navigator.languages[i]] != null &&
                        this.translations[originalLanguage] &&
                        this.translations[originalLanguage][navigator.languages[i]] &&
                        this.translations[originalLanguage][navigator.languages[i]][phrase]) {
                        return this.translations[originalLanguage][navigator.languages[i]][phrase];
                    }
                }
            }
        }
        return phrase;
    };
    return LangTranslateClient;
}());
//# sourceMappingURL=LangTranslateClient.js.map