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
exports.removeBookmark = void 0;
const tokenDecoder_1 = require("./../../helper/tokenDecoder");
const generateError_1 = require("./../../helper/generateError");
const user_1 = require("./../../model/user");
const removeBookmark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body: { memoryId }, headers, } = req;
    const authToken = ((_a = headers === null || headers === void 0 ? void 0 : headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
    const { id } = (0, tokenDecoder_1.tokenDecoder)(authToken);
    try {
        if (!memoryId)
            return (0, generateError_1.generateError)(res, 500, 'memory id is required');
        let user = yield user_1.userModal.findByIdAndUpdate(id, {
            new: true,
            $pull: {
                myBookmarks: memoryId,
            },
        });
        if (!user)
            return (0, generateError_1.generateError)(res, 500, 'un-authorize request');
        const updatedBookmarks = user === null || user === void 0 ? void 0 : user.myBookmarks.filter((bookmark) => bookmark != memoryId);
        user.myBookmarks = updatedBookmarks;
        res.send({
            status: 200,
            message: 'bookmark removed Successfully',
            data: user,
        });
    }
    catch (error) {
        const err = error;
        return (0, generateError_1.generateError)(res, 500, err === null || err === void 0 ? void 0 : err.message);
    }
});
exports.removeBookmark = removeBookmark;
