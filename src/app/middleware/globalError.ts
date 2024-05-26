import { NextFunction, Request, Response } from "express";
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalErrorhandller = ((error:any, req:Request, res:Response,next:NextFunction)=>{

return res.status(500).json({
    success:false,
    message: error.message || "something error",
    error:error
})



})

export default GlobalErrorhandller