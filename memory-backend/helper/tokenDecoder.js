"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDecoder = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenDecoder = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRECT || '');
    return decoded;
};
exports.tokenDecoder = tokenDecoder;
