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
exports.getMemoryByTag = void 0;
const memory_1 = require("./../../model/memory");
const getMemoryByTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let data;
    try {
        const tag = (_a = req.query) === null || _a === void 0 ? void 0 : _a.tag;
        const tagsArray = tag.split(',').map((tg) => tg);
        //  data=await memories.find({tags:[tag]}) // for one tag
        data = yield memory_1.memories.find({ tags: { $in: tagsArray } }); // for all tag
        res.send({
            status: 'success',
            length: data === null || data === void 0 ? void 0 : data.length,
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
exports.getMemoryByTag = getMemoryByTag;
