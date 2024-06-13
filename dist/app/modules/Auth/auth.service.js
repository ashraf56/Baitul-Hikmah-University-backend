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
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const throwError_1 = require("../../utils/throwError");
const user_model_1 = __importDefault(require("../user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const LoginUSer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExistsByCustomId(payload.id);
    if (!user) {
        (0, throwError_1.throwError)("User not found");
    }
    const isDeletedUser = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeletedUser) {
        (0, throwError_1.throwError)("User is Deleted");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        (0, throwError_1.throwError)("User is blocked");
    }
    // cheking password matching
    const isPasswordmatch = yield user_model_1.default.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordmatch) {
        (0, throwError_1.throwError)('password not matched');
    }
    // jwt
    const datapayload = {
        id: user.id,
        role: user.role
    };
    const accessToken = jsonwebtoken_1.default.sign(datapayload, config_1.default.jwt_Token, { expiresIn: '1D' });
    const refreshToken = jsonwebtoken_1.default.sign(datapayload, config_1.default.JWT_Refresh_token, { expiresIn: '365D' });
    return {
        accessToken,
        needPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
        refreshToken
    };
});
const changePasswordDB = (userdata, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExistsByCustomId(userdata.id);
    if (!user) {
        (0, throwError_1.throwError)("User not found");
    }
    const isDeletedUser = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeletedUser) {
        (0, throwError_1.throwError)("User is Deleted");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        (0, throwError_1.throwError)("User is blocked");
    }
    // cheking password matching
    const isPasswordmatch = yield user_model_1.default.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordmatch) {
        (0, throwError_1.throwError)('password not matched');
    }
    const newHashpassword = yield bcrypt_1.default.hash(payload.newpassword, Number(config_1.default.saltNumber));
    yield user_model_1.default.findOneAndUpdate({
        id: userdata.id,
        role: userdata.role
    }, {
        password: newHashpassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date()
    });
    return null;
});
exports.AuthService = {
    LoginUSer,
    changePasswordDB
};
