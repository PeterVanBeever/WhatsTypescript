var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
// Select the form and result elements
var form = document.querySelector('#defineform');
var resultContainer = document.querySelector('#definition-result');
// Ensure that form and resultContainer are present
if (form && resultContainer) {
    // Form submission event handler
    form.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var formData, word, response, data, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    event.preventDefault(); // Prevent form from reloading the page
                    formData = new FormData(form);
                    word = (_a = formData.get('defineword')) === null || _a === void 0 ? void 0 : _a.trim();
                    if (!word) return [3 /*break*/, 6];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    // Display a loading message
                    resultContainer.innerHTML = "<p class=\"text-info\">Fetching definition for \"<strong>".concat(word, "</strong>\"...</p>");
                    return [4 /*yield*/, fetch("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(encodeURIComponent(word)))];
                case 2:
                    response = _c.sent();
                    if (!response.ok) {
                        throw new Error('Word not found. Please check the spelling and try again.');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _c.sent();
                    resultContainer.innerHTML = "<h2>Definitions for \"".concat(word, "\":</h2>");
                    // Display the definitions
                    if (Array.isArray(data) && ((_b = data[0]) === null || _b === void 0 ? void 0 : _b.meanings)) {
                        data[0].meanings.forEach(function (meaning) {
                            var partOfSpeech = document.createElement('h3');
                            partOfSpeech.textContent = meaning.partOfSpeech;
                            resultContainer.appendChild(partOfSpeech);
                            var definitionList = document.createElement('ul');
                            meaning.definitions.forEach(function (definition) {
                                var listItem = document.createElement('li');
                                listItem.textContent = definition.definition;
                                definitionList.appendChild(listItem);
                            });
                            resultContainer.appendChild(definitionList);
                        });
                    }
                    else {
                        resultContainer.innerHTML = "<p class=\"text-warning\">No definitions found.</p>";
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    resultContainer.innerHTML = "<p class=\"text-danger\">Error: ".concat(error_1.message, "</p>");
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    resultContainer.innerHTML = "<p class=\"text-warning\">Please enter a word to define.</p>";
                    _c.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); });
}
