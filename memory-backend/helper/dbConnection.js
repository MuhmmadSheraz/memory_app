"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    try {
        mongoose_1.default.connect(`mongodb+srv://demouser:demouser1231456@cluster0.3juuo.mongodb.net/MemoryApp?retryWrites=true&w=majority`, {
            // @ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongo-DB Connected Successfully ✔');
    }
    catch (err) {
        console.log('Mongo DB Cofig Failed');
    }
};
exports.connectDB = connectDB;
