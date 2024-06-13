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
const authRequestValidator = (...requireRole) => {
    return (0, catchAsync_1.catchasync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // retrive token 
        const token = req.headers.authorization;
        if (!token) {
            (0, throwError_1.throwError)('you are Unauthorized');
        }
        // token  varification
        jsonwebtoken_1.default.verify(token, config_1.default.jwt_Token, function (err, decoded) {
            if (err) {
                (0, throwError_1.throwError)('you are Unauthorized');
            }
            // set role based Authorization
            if (requireRole && !requireRole.includes(decoded === null || decoded === void 0 ? void 0 : decoded.role)) {
                (0, throwError_1.throwError)('you are Unauthorized');
            }
            req.user = decoded;
            next();
        });
    }));
};
exports.default = authRequestValidator;
