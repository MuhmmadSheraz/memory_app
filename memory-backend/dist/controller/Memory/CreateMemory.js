"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemory = void 0;
var tokenDecoder_1 = require("./../../helper/tokenDecoder");
var memory_1 = require("./../../model/memory");
var cloudinary_1 = __importDefault(require("cloudinary"));
var createMemory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, headers, file, authToken, id, memBody_1, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                cloudinary_1.default.v2.config({
                    cloud_name: process.env.CLOUD_NAME,
                    api_key: process.env.CLOUD_API,
                    api_secret: process.env.CLOUD_API_SECRET,
                });
                body = req.body, headers = req.headers;
                file = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                authToken = ((_b = headers === null || headers === void 0 ? void 0 : headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]) || '';
                id = (0, tokenDecoder_1.tokenDecoder)(authToken).id;
                memBody_1 = __assign({}, body);
                memBody_1.tags = JSON.parse(body === null || body === void 0 ? void 0 : body.tags);
                memBody_1.userId = id;
                return [4 /*yield*/, ((_c = cloudinary_1.default.v2.uploader) === null || _c === void 0 ? void 0 : _c.upload(
                    // @ts-ignore
                    file === null || file === void 0 ? void 0 : file.tempFilePath, {
                        folder: 'memories',
                    }, function (error, result) {
                        if (error) {
                            console.log('err', error);
                        }
                        else {
                            console.log('result', result);
                            memBody_1.image = result.url;
                        }
                    }))];
            case 2:
                _d.sent();
                return [4 /*yield*/, memory_1.memories.create(memBody_1)];
            case 3:
                _d.sent();
                console.log('body***', memBody_1);
                res.send({
                    status: 201,
                    message: 'success',
                    data: {},
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _d.sent();
                console.log('error', error_1.message);
                res.send({
                    status: 500,
                    message: error_1 === null || error_1 === void 0 ? void 0 : error_1.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createMemory = createMemory;
