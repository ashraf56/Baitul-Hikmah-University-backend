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
const catchAsync_1 = require("../utils/catchAsync");
const throwError_1 = require("../utils/throwError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const http_status_1 = __importDefault(require("http-status"));
const ErrorApp_1 = __importDefault(require("../errors/ErrorApp"));
const authRequestValidator = (...requireRole) => {
    return (0, catchAsync_1.catchasync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // retrive token 
        const token = req.headers.authorization;
        if (!token || !token.startsWith('Bearer')) {
            throw new ErrorApp_1.default(401, "you are Unauthorized");
        }
        const tokenFormated = token.startsWith('Bearer') ? token : `Bearer${token}`;
        const accessToken = tokenFormated.split(' ')[1];
        if (!accessToken) {
            throw new ErrorApp_1.default(http_status_1.default.UNAUTHORIZED, "you are Unauthorized");
        }
        // token  varification
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(accessToken, config_1.default.jwt_Token);
        }
        catch (error) {
            throw new ErrorApp_1.default(http_status_1.default.UNAUTHORIZED, "you are Unauthorized");
        }
        const { id, role, iat } = decoded;
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
        // set role based Authorization
        if (requireRole && !requireRole.includes(role)) {
            (0, throwError_1.throwError)('you are Unauthorized');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = authRequestValidator;
