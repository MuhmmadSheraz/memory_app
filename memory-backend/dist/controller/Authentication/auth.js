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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.resetPassword = exports.validateResetPasswordToken = exports.forgotPassword = exports.signIn = exports.signUp = void 0;
var email_1 = require("./../../helper/email");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var generateError_1 = require("./../../helper/generateError");
var user_1 = require("./../../model/user");
var generateToken_1 = require("../../helper/generateToken");
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, token, expiry, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.userModal.create({
                        name: req.body.name,
                        email: req.body.email,
                        profilePicture: req.body.profilePicture,
                        password: req.body.password,
                        confirmPassword: req.body.confirmPassword,
                    })];
            case 1:
                newUser = _a.sent();
                token = (0, generateToken_1.generateToken)(newUser._id);
                expiry = process.env.JWT_COOKIE_EXPIRY;
                // Sending Token In Cookie
                res
                    .cookie('jwt', token, {
                    expires: new Date((Date.now() + parseInt(expiry)) * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                })
                    .status(200);
                res.send({
                    status: 200,
                    user: { token: token, newUser: newUser },
                    message: 'user created Successfully',
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                (0, generateError_1.generateError)(res, 500, error_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, correctPassword, token, expiry;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password)
                    return [2 /*return*/, (0, generateError_1.generateError)(res, 500, 'email and password are required')];
                return [4 /*yield*/, user_1.userModal
                        .findOne({ email: email })
                        .select('+password')];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, (0, generateError_1.generateError)(res, 500, 'No user found')];
                return [4 /*yield*/, user.correctPassword(password, user.password)];
            case 2:
                correctPassword = _b.sent();
                if (!correctPassword)
                    return [2 /*return*/, (0, generateError_1.generateError)(res, 500, 'Incorrect password')];
                token = (0, generateToken_1.generateToken)(user === null || user === void 0 ? void 0 : user._id.toString());
                expiry = process.env.JWT_COOKIE_EXPIRY;
                res
                    .cookie('jwt', token, {
                    expires: new Date((Date.now() + parseInt(expiry)) * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                })
                    .send({
                    status: 200,
                    message: 'Signed In Successfully',
                    user: { token: token, user: user },
                });
                return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
var forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, resetToken, message;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, user_1.userModal.findOne({ email: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    (0, generateError_1.generateError)(res, 404, 'No user found with this email');
                }
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.createResetPasswordToken())];
            case 2:
                resetToken = _b.sent();
                message = "Your Password Reset Link is ---::----- ".concat(resetToken);
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                (0, email_1.sendEmail)({ email: user === null || user === void 0 ? void 0 : user.email, message: message });
                res.send({
                    status: 200,
                    message: 'Reset link has been sent to your email',
                });
                return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
var validateResetPasswordToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resetToken, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resetToken = req.params.token;
                // hashing the token
                resetToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
                return [4 /*yield*/, user_1.userModal.findOne({
                        passwordResetToken: resetToken,
                        expiryOfPasswordResetToken: { $gt: Date.now() },
                    })];
            case 1:
                user = _a.sent();
                if (!user)
                    (0, generateError_1.generateError)(res, 404, 'Invalid Token');
                res.send({
                    status: 200,
                    message: 'Request Successful',
                });
                return [2 /*return*/];
        }
    });
}); };
exports.validateResetPasswordToken = validateResetPasswordToken;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resetToken, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resetToken = req.params.token;
                // hashing the token
                resetToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.userModal.findOne({
                        passwordResetToken: resetToken,
                        expiryOfPasswordResetToken: { $gt: Date.now() },
                    })];
            case 2:
                user = _a.sent();
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
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                (0, generateError_1.generateError)(res, 500, error_2.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
var protect = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, authToken, decoded, validUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                headers = (req === null || req === void 0 ? void 0 : req.headers.authorization) || '';
                console.log(req === null || req === void 0 ? void 0 : req.headers.authorization);
                authToken = headers === null || headers === void 0 ? void 0 : headers.split(' ')[1];
                if (!authToken || authToken === undefined)
                    return [2 /*return*/, (0, generateError_1.generateError)(res, 500, 'Unauthorized request')];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log({ authToken: authToken });
                decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRECT || '');
                return [4 /*yield*/, user_1.userModal.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id)];
            case 2:
                validUser = _a.sent();
                if (!validUser)
                    return [2 /*return*/, (0, generateError_1.generateError)(res, 500, 'This token is not belong to any user')];
                next();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                (0, generateError_1.generateError)(res, 500, 'Invalid Token');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.protect = protect;
