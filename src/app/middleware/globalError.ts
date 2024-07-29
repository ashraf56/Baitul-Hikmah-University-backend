import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ErrorSource } from "../publicInterface/Terrorsource";
import handlezodvalidationerror from "../errors/handlezodvalidationerror";
import config from "../config";
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorhandller: ErrorRequestHandler = ((error, req, res, next) => {


    let statuscode = error.statusCode || 500
    
    
    
    let message = error.message || "something error"


    let errorsource: ErrorSource = [
        {
            path: '',
            message: "something error "
        }
    ]



    if (error instanceof ZodError) {
        const simplifiederror = handlezodvalidationerror(error);
        statuscode = simplifiederror?.statusCode;
        message = simplifiederror?.message;
        errorsource = simplifiederror?.errorsource
    }

    return res.status(statuscode).json({
        success: false,
        message,
        errorsource,
        stack: config.node_Env === 'development' ? error?.stack : null
    })



})

export default GlobalErrorhandller