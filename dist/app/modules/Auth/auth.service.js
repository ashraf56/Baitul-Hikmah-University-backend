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
const sendEmil_1 = require("../../utils/sendEmil");
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
    const accessToken = jsonwebtoken_1.default.sign(datapayload, config_1.default.jwt_Token, { expiresIn: '10D' });
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
// it will create an accesstoken from Refreshtoken.
const RefreshTokenDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        (0, throwError_1.throwError)('you are Unauthorized');
    }
    // token  varification
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_Refresh_token);
    const { id, iat } = decoded;
    const user = yield user_model_1.default.isUserExistsByCustomId(id);
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
    if (user.passwordChangedAt && user_model_1.default.is_jwt_Issued_Before_Password_Change(user.passwordChangedAt, iat)) {
        (0, throwError_1.throwError)('you are Unauthorized');
    }
    const datapayload = {
        id: user.id,
        role: user.role
    };
    const accessToken = jsonwebtoken_1.default.sign(datapayload, config_1.default.jwt_Token, { expiresIn: '1D' });
    return { accessToken };
});
const forgetPasswordDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExistsByCustomId(id);
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
    const datapayload = {
        id: user.id,
        role: user.role
    };
    const accessToken = jsonwebtoken_1.default.sign(datapayload, config_1.default.jwt_Token, { expiresIn: '1h' });
    const resetULlink = `${config_1.default.FrogetPassUr}?id=${user.id}&token=${accessToken}`;
    (0, sendEmil_1.sendEmail)(user.email, resetULlink);
});
const resetPasswordDB = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExistsByCustomId(payload.id);
    console.log(token);
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
});
exports.AuthService = {
    LoginUSer,
    changePasswordDB,
    RefreshTokenDB,
    forgetPasswordDB,
    resetPasswordDB
};
