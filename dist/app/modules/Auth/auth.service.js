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
const throwError_1 = require("../../utils/throwError");
const user_model_1 = __importDefault(require("../user/user.model"));
const LoginUSer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_model_1.default.findOne({ id: payload.id });
    if (!isUser) {
        throw new Error("User not found");
    }
    const isDeletedUser = isUser.isDeleted;
    if (isDeletedUser) {
        (0, throwError_1.throwError)("User is Deleted");
    }
});
exports.AuthService = {
    LoginUSer
};
