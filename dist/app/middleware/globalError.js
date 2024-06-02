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
    const errorsource = [
        {
            path: '',
            message: "something error "
        }
    ];
    if (error instanceof zod_1.ZodError) {
        {
            statuscode = 401;
            message = "amader validation error";
        }
    }
    return res.status(statuscode).json({
        success: false,
        message,
        error: error
    });
});
exports.default = GlobalErrorhandller;
