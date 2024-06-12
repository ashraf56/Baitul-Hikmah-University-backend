import { NextFunction, Request, Response } from "express"
import { catchasync } from "../utils/catchAsync"
import { throwError } from "../utils/throwError"


const authRequestValidator = () => {
    return catchasync(
        async (req: Request, res: Response, next: NextFunction) => {

            const token = req.headers.authorization

            if (!token) {
                throwError('you are Unauthorized')
            }


            next()

        }
    )
}


export default authRequestValidator