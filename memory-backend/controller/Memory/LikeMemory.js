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
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeMemory = void 0;
const generateError_1 = require("./../../helper/generateError");
const memory_1 = require("./../../model/memory");
const tokenDecoder_1 = require("../../helper/tokenDecoder");
const likeMemory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body, headers } = req;
    if (!body.memoryId)
        (0, generateError_1.generateError)(res, 500, 'Invalid Payload');
    try {
        const authToken = ((_a = headers === null || headers === void 0 ? void 0 : headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
        const { id } = (0, tokenDecoder_1.tokenDecoder)(authToken);
        const data = yield memory_1.memories.findByIdAndUpdate(body.memoryId, {
            new: true,
            $addToSet: {
                likes: id,
            },
        });
        res.send({
            status: 200,
            message: 'Memory Liked Successfully',
            data,
        });
    }
    catch (error) {
        res.send({
            status: 500,
            message: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.likeMemory = likeMemory;
