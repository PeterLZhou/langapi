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
var path = require("path");
var child_process_1 = require("child_process");
function sh(cmd) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    child_process_1.exec(cmd, function (err, stdout, stderr) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({ stdout: stdout, stderr: stderr });
                        }
                    });
                })];
        });
    });
}
exports.sh = sh;
function getBackendUrl() {
    return "https://lang-backend.herokuapp.com/";
}
exports.getBackendUrl = getBackendUrl;
function absolutePath(sourceDir, fileName) {
    if (fileName) {
        return path.resolve(process.cwd(), sourceDir, fileName);
    }
    return path.resolve(process.cwd(), sourceDir);
}
exports.absolutePath = absolutePath;
exports.TypescriptLangClient = "import LangTranslateClient from 'langapi';\n\nconst LangClient = LangTranslateClient(\n  process.env.LANG_KEY,\n  require(\"./.lang/translations.json\"),\n  require(\"./.lang/langconfig.json\")\n);\n\nexport function tr(phrase: string) {\n  return LangClient.tr(phrase);\n};\n";
exports.JavascriptLangClient = "var LangClient = require('langapi')(\n  process.env.LANG_KEY,\n  require(\"./.lang/translations.json\"),\n  require(\"./.lang/langconfig.json\")\n);\n\nexport function tr(phrase) {\n  return LangClient.tr(phrase);\n};\n";
// Take newline delimitted output and return an array of lines
exports.lines = function (newlined) {
    return newlined
        .toString()
        .trim()
        .split("\n");
};
function flattenArray(array) {
    return array.reduce(function (flat, toFlatten) {
        return flat.concat(toFlatten);
    }, []);
}
exports.flattenArray = flattenArray;
//# sourceMappingURL=utils.js.map