import { ErrorRequestHandler } from "express";
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorhandller:ErrorRequestHandler = ((error, req, res, next) => {

    return res.status(500).json({
        success: false,
        message: error.message || "something error",
        error: error
    })



})

export default GlobalErrorhandller