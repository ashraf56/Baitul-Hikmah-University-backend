import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorhandller: ErrorRequestHandler = ((error, req, res, next) => {

    let statuscode = error.statuscode || 500
    let message = error.message || "something error"

    type ErrorSource = {
        path: string | number,
        message: string
    }[];

    let errorsource: ErrorSource = [
        {
            path: '',
            message: "something error "
        }
    ]

    const handleZodErrorsource = (error:ZodError)=>{
   const errorsource:ErrorSource = error.issues.map((issue:ZodIssue)=>{
    return {
    path: issue?.path[issue?.path.length-1],
    message:issue.message
    }
   })

       return {
    statuscode,
    message:"our validation error",
        errorsource
       } 
    }

    if (error instanceof ZodError) {
        const simplifiederror= handleZodErrorsource(error);
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