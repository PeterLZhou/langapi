"use strict";
exports.__esModule = true;
var trRegex = /tr\("(.*)"\)|tr\('(.*)'\)/gm;
function getTranslateStrippedText(translateText) {
    var rawText = trRegex.exec(translateText);
    if (rawText && rawText.length >= 2 && true) {
        return rawText[1];
    }
    return null;
}
exports.getTranslateStrippedText = getTranslateStrippedText;
//# sourceMappingURL=utils.js.map