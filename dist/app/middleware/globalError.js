"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handlezodvalidationerror_1 = __importDefault(require("../errors/handlezodvalidationerror"));
const config_1 = __importDefault(require("../config"));
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorhandller = ((error, req, res, next) => {
    let statuscode = error.statusCode || 500;
    let message = error.message || "something error";
    let errorsource = [
        {
            path: '',
            message: "something error "
        }
    ];
    if (error instanceof zod_1.ZodError) {
        const simplifiederror = (0, handlezodvalidationerror_1.default)(error);
        statuscode = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.statusCode;
        message = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.message;
        errorsource = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.errorsource;
    }
    return res.status(statuscode).json({
        success: false,
        message,
        errorsource,
        stack: config_1.default.node_Env === 'development' ? error === null || error === void 0 ? void 0 : error.stack : null
    });
});
exports.default = GlobalErrorhandller;
