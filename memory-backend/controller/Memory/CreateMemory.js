"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemory = void 0;
const tokenDecoder_1 = require("./../../helper/tokenDecoder");
const memory_1 = require("./../../model/memory");
const cloudinary_1 = __importDefault(require("cloudinary"));
const createMemory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    cloudinary_1.default.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API,
        api_secret: process.env.CLOUD_API_SECRET,
    });
    const { body, headers } = req;
    const file = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image;
    try {
        const authToken = ((_b = headers === null || headers === void 0 ? void 0 : headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]) || '';
        const { id } = (0, tokenDecoder_1.tokenDecoder)(authToken);
        let memBody = Object.assign({}, body);
        memBody.tags = JSON.parse(body === null || body === void 0 ? void 0 : body.tags);
        memBody.userId = id;
        yield ((_c = cloudinary_1.default.v2.uploader) === null || _c === void 0 ? void 0 : _c.upload(
        // @ts-ignore
        file === null || file === void 0 ? void 0 : file.tempFilePath, {
            folder: 'memories',
        }, function (error, result) {
            if (error) {
                console.log('err', error);
            }
            else {
                console.log('result', result);
                memBody.image = result.url;
            }
        }));
        yield memory_1.memories.create(memBody);
        console.log('body***', memBody);
        res.send({
            status: 201,
            message: 'success',
            data: {},
        });
    }
    catch (error) {
        console.log('error', error.message);
        res.send({
            status: 500,
            message: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.createMemory = createMemory;
