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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModal = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: validator_1.default.isEmail,
    },
    profilePicture: {
        type: String,
        required: [false, 'profilePicture is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'confirmPassword is required'],
        minlength: 6,
        select: false,
    },
    myBookmarks: {
        type: [String],
        default: [],
    },
    passwordResetToken: String,
    expiryOfPasswordResetToken: Date,
});
// Methods are some custom helper function
//  We are using methods because of (FAT Model and THIN Controller philosophy)
// Method for create resetPasswordtoken
// Method for authenticate password
userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(candidatePassword, userPassword);
    });
};
// Middleware for password confirmation
userSchema.pre('validate', function (next) {
    if (this.confirmPassword && this.password !== this.confirmPassword) {
        this.invalidate('passwordConfirmation', 'enter the same password');
    }
    next();
});
// Password hashing using middleware
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // do not has hashed the password if it's not modified or newly created
        if (!this.isModified('password'))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 10);
        this.confirmPassword = undefined;
        next();
    });
});
userSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString('hex'); // generating token
    const hasedToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetToken = hasedToken; // will save hashed token in db for security purpose
    this.expiryOfPasswordResetToken = Date.now() + 30 * 60 * 1000; // 10 mins
    return resetToken;
};
exports.userModal = mongoose_1.default.model('users', userSchema);
