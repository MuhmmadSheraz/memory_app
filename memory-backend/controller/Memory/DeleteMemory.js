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
exports.deleteMemory = void 0;
const memory_1 = require("./../../model/memory");
const deleteMemory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req;
    try {
        yield memory_1.memories.deleteOne({ id: params === null || params === void 0 ? void 0 : params.id });
        res.send({
            status: 200,
            message: 'Memory Deleted Successfully'
        });
    }
    catch (error) {
        res.send({
            status: 500,
            message: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.deleteMemory = deleteMemory;
