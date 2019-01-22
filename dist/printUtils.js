"use strict";
exports.__esModule = true;
function printTranslateCall(translateCall, chalkFunction) {
    console.log(chalkFunction(translateCall.text) +
        " at " +
        translateCall.sourceFileName +
        ":" +
        translateCall.line +
        ":" +
        translateCall.character);
}
exports.printTranslateCall = printTranslateCall;
//# sourceMappingURL=printUtils.js.map