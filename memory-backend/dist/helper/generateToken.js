"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateToken = function (id) {
    console.log(id);
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRECT || '', { expiresIn: '60d' });
};
exports.generateToken = generateToken;
