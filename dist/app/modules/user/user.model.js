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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    id: {
        type: String, required: true, unique: true
    },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: {
            values: ['in-progress', 'blocked']
        },
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltNumber = 10;
        this.password = yield bcrypt_1.default.hash(this.password, saltNumber);
        next();
    });
});
UserSchema.post('save', function (doc, next) {
    doc.password = "";
    next();
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
