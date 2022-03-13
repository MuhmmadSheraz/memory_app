"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memories = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const currentDate = new Date();
const memorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: [true, 'title is required'],
    },
    description: {
        type: String,
        require: [true, 'description is required for memory'],
    },
    image: {
        type: String,
        require: [true, 'image is required'],
    },
    createdAt: {
        type: Date,
        default: currentDate.getDate(),
    },
    likes: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        require: [true, 'tags are required'],
    },
    isPublic: {
        type: Boolean,
        require: [true, 'memory type is required public or private'],
    },
    userId: {
        type: String,
        require: [true, 'user is required'],
    },
});
// Query Middleware for not showing any private memory in getMemories
// Here we use reg. expression for any find method or findById should not return private memory
// regex for allFind ==> /^find/
// memorySchema.pre('find', function (next) {
//   this.find({ isPublic: { $ne: false } });
//   next();
// });
// Indexing for searching
memorySchema.index({ title: 1 });
exports.memories = mongoose_1.default.model('Memories', memorySchema);
