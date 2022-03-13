"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateError = void 0;
const generateError = (res, status, message) => {
    return res.status(status).send({
        message
    });
};
exports.generateError = generateError;
