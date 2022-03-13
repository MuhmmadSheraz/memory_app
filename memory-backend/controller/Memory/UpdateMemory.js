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
exports.updateMemory = void 0;
const memory_1 = require("./../../model/memory");
const updateMemory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params, body } = req;
    console.log(params === null || params === void 0 ? void 0 : params.id);
    console.log(body);
    try {
        const data = yield memory_1.memories.findByIdAndUpdate(params === null || params === void 0 ? void 0 : params.id, body);
        res.send({
            status: 200,
            message: 'Memory Updated Successfully',
            data
        });
    }
    catch (error) {
        res.send({
            status: 500,
            message: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.updateMemory = updateMemory;
