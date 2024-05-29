"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorhandller = ((error, req, res, next) => {
    return res.status(500).json({
        success: false,
        message: error.message || "something error",
        error: error
    });
});
exports.default = GlobalErrorhandller;
