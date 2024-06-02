import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorhandller: ErrorRequestHandler = ((error, req, res, next) => {

    let statuscode = error.statuscode || 500
    let message = error.message || "something error"

    type ErrorSource = {
        path: '',
        message: string
    }[];

    const errorsource: ErrorSource = [
        {
            path: '',
            message: "something error "
        }
    ]

    if (error instanceof ZodError) {
        {
            statuscode = 401
            message = "amader validation error"

        }
    }

    return res.status(statuscode).json({
        success: false,
        message,
        error: error
    })



})

export default GlobalErrorhandller