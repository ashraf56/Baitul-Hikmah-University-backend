"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorhandller = ((error, req, res, next) => {
    let statuscode = error.statuscode || 500;
    let message = error.message || "something error";
    let errorsource = [
        {
            path: '',
            message: "something error "
        }
    ];
    const handleZodErrorsource = (error) => {
        const errorsource = error.issues.map((issue) => {
            return {
                path: issue === null || issue === void 0 ? void 0 : issue.path[(issue === null || issue === void 0 ? void 0 : issue.path.length) - 1],
                message: issue.message
            };
        });
        return {
            statuscode,
            message: "our validation error",
            errorsource
        };
    };
    if (error instanceof zod_1.ZodError) {
        const simplifiederror = handleZodErrorsource(error);
        statuscode = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.statuscode;
        message = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.message;
        errorsource = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.errorsource;
    }
    return res.status(statuscode).json({
        success: false,
        message,
        errorsource
    });
});
exports.default = GlobalErrorhandller;
