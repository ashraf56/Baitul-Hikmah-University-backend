import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ErrorSource } from "../publicInterface/Terrorsource";
import handlezodvalidationerror from "../errors/handlezodvalidationerror";
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorhandller: ErrorRequestHandler = ((error, req, res, next) => {

    let statuscode = error.statuscode || 500
    let message = error.message || "something error"


    let errorsource: ErrorSource = [
        {
            path: '',
            message: "something error "
        }
    ]



    if (error instanceof ZodError) {
        const simplifiederror = handlezodvalidationerror(error);
        statuscode = simplifiederror?.statuscode;
        message = simplifiederror?.message;
        errorsource = simplifiederror?.errorsource
    }

    return res.status(statuscode).json({
        success: false,
        message,
        errorsource
    })



})

export default GlobalErrorhandller