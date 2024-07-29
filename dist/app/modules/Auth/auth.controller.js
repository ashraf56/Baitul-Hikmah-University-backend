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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = require("../../utils/catchAsync");
const auth_service_1 = require("./auth.service");
const LoginUserController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.LoginUSer(req.body);
    const { refreshToken, accessToken, needPasswordChange } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_Env === 'production',
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Login success",
        data: {
            accessToken,
            needPasswordChange
        }
    });
}));
const ChangepassController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = __rest(req.body, []);
    const result = yield auth_service_1.AuthService.changePasswordDB(req.user, password);
    res.status(200).json({
        success: true,
        message: "Password changed success",
        data: result
    });
}));
const RefreshTokenController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthService.RefreshTokenDB(refreshToken);
    res.status(200).json({
        success: true,
        message: "Access token is retrieved succesfully!",
        data: result
    });
}));
const forgetPasswordController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    const result = yield auth_service_1.AuthService.forgetPasswordDB(userId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Reset link is generated succesfully!",
        data: result
    });
}));
const resetPasswordController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield auth_service_1.AuthService.resetPasswordDB(req.body, token);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Reset link is generated succesfully!",
        data: result
    });
}));
exports.AuthController = {
    LoginUserController,
    ChangepassController,
    RefreshTokenController,
    forgetPasswordController,
    resetPasswordController
};
