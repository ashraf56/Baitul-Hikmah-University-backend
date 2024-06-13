import { ZodError, ZodIssue } from "zod";
import { ErrorSource, TGenericErrorResponse } from "../publicInterface/Terrorsource";


const handlezodvalidationerror = (error: ZodError): TGenericErrorResponse => {
    const errorsource: ErrorSource = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue?.path.length - 1],
            message: issue.message
        }
    })
    const statuscode = 400
    return {
        statuscode,
        message: "our validation error",
        errorsource
    }
};

export default handlezodvalidationerror;