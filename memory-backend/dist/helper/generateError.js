"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateError = void 0;
var generateError = function (res, status, message) {
    return res.status(status).send({
        message: message
    });
};
exports.generateError = generateError;
