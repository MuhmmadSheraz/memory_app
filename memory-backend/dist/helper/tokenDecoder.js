"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDecoder = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenDecoder = function (token) {
    var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRECT || '');
    return decoded;
};
exports.tokenDecoder = tokenDecoder;
