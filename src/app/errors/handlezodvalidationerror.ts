import { ZodError, ZodIssue } from "zod";
import { ErrorSource, TGenericErrorResponse } from "../publicInterface/Terrorsource";
import httpStatus from "http-status";


const handlezodvalidationerror = (error: ZodError): TGenericErrorResponse => {
    const errorsource: ErrorSource = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue?.path.length - 1],
            message: issue.message
        }
    })
    const statusCode = httpStatus.BAD_REQUEST
    return {
        statusCode,
        message: "our validation error",
        errorsource
    }
};

export default handlezodvalidationerror;