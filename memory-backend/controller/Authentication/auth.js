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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.resetPassword = exports.validateResetPasswordToken = exports.forgotPassword = exports.signIn = exports.signUp = void 0;
const email_1 = require("./../../helper/email");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const generateError_1 = require("./../../helper/generateError");
const user_1 = require("./../../model/user");
const generateToken_1 = require("../../helper/generateToken");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_1.userModal.create({
            name: req.body.name,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        });
        const token = (0, generateToken_1.generateToken)(newUser._id);
        const expiry = process.env.JWT_COOKIE_EXPIRY;
        // Sending Token In Cookie
        res
            .cookie('jwt', token, {
            expires: new Date((Date.now() + parseInt(expiry)) * 24 * 60 * 60 * 1000),
            httpOnly: true,
        })
            .status(200);
        res.send({
            status: 200,
            user: { token, newUser },
            message: 'user created Successfully',
        });
    }
    catch (error) {
        (0, generateError_1.generateError)(res, 500, error.message);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return (0, generateError_1.generateError)(res, 500, 'email and password are required');
    const user = yield user_1.userModal
        .findOne({ email })
        .select('+password');
    if (!user)
        return (0, generateError_1.generateError)(res, 500, 'No user found');
    const correctPassword = yield user.correctPassword(password, user.password);
    if (!correctPassword)
        return (0, generateError_1.generateError)(res, 500, 'Incorrect password');
    const token = (0, generateToken_1.generateToken)(user === null || user === void 0 ? void 0 : user._id.toString());
    const expiry = process.env.JWT_COOKIE_EXPIRY;
    res
        .cookie('jwt', token, {
        expires: new Date((Date.now() + parseInt(expiry)) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    })
        .send({
        status: 200,
        message: 'Signed In Successfully',
        user: { token, user },
    });
});
exports.signIn = signIn;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // FD ---> Send Me Reset Email
    var _a;
    // 1) Find User By Email
    const user = yield user_1.userModal.findOne({ email: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email });
    if (!user) {
        (0, generateError_1.generateError)(res, 404, 'No user found with this email');
    }
    // 2) Generate Password Expiry Token and save it to DB
    const resetToken = yield (user === null || user === void 0 ? void 0 : user.createResetPasswordToken());
    const message = `Your Password Reset Link is ---::----- ${resetToken}`;
    yield user.save();
    (0, email_1.sendEmail)({ email: user === null || user === void 0 ? void 0 : user.email, message });
    res.send({
        status: 200,
        message: 'Reset link has been sent to your email',
    });
});
exports.forgotPassword = forgotPassword;
const validateResetPasswordToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // For validating if token and expiry then only show green single to render {Reset Password Page}
    let resetToken = req.params.token;
    // hashing the token
    resetToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
    const user = yield user_1.userModal.findOne({
        passwordResetToken: resetToken,
        expiryOfPasswordResetToken: { $gt: Date.now() },
    });
    if (!user)
        (0, generateError_1.generateError)(res, 404, 'Invalid Token');
    res.send({
        status: 200,
        message: 'Request Successful',
    });
});
exports.validateResetPasswordToken = validateResetPasswordToken;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // For validating if token and expiry then only show green single to render {Reset Password Page}
    let resetToken = req.params.token;
    // hashing the token
    resetToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
    try {
        const user = yield user_1.userModal.findOne({
            passwordResetToken: resetToken,
            expiryOfPasswordResetToken: { $gt: Date.now() },
        });
        if (!user)
            (0, generateError_1.generateError)(res, 404, 'Invalid Token');
        // Finally updating the password
        user.password = req === null || req === void 0 ? void 0 : req.body.password;
        user.passwordResetToken = undefined;
        user.expiryOfPasswordResetToken = undefined;
        user.save();
        res.send({
            status: 201,
            message: 'Password has updated',
        });
    }
    catch (error) {
        (0, generateError_1.generateError)(res, 500, error.message);
    }
});
exports.resetPassword = resetPassword;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = (req === null || req === void 0 ? void 0 : req.headers.authorization) || '';
    console.log(req === null || req === void 0 ? void 0 : req.headers.authorization);
    const authToken = headers === null || headers === void 0 ? void 0 : headers.split(' ')[1];
    if (!authToken || authToken === undefined)
        return (0, generateError_1.generateError)(res, 500, 'Unauthorized request');
    try {
        console.log({ authToken });
        const decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRECT || '');
        const validUser = yield user_1.userModal.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
        if (!validUser)
            return (0, generateError_1.generateError)(res, 500, 'This token is not belong to any user');
        next();
    }
    catch (error) {
        (0, generateError_1.generateError)(res, 500, 'Invalid Token');
    }
});
exports.protect = protect;
