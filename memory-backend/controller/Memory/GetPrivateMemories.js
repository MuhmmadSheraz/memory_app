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
exports.getAllPrivateMemories = void 0;
const tokenDecoder_1 = require("./../../helper/tokenDecoder");
const memory_1 = require("./../../model/memory");
const getAllPrivateMemories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { headers: { authorization }, } = req;
    const authToken = (authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1]) || '';
    try {
        const { id } = (0, tokenDecoder_1.tokenDecoder)(authToken);
        let data = yield memory_1.memories.find({
            isPublic: { $eq: false },
            userId: id,
        });
        res.send({
            status: 'success',
            length: data === null || data === void 0 ? void 0 : data.length,
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
exports.getAllPrivateMemories = getAllPrivateMemories;
