import { NextFunction, Request, Response } from "express"
import { catchasync } from "../utils/catchAsync"
import { throwError } from "../utils/throwError"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"

const authRequestValidator = () => {
    return catchasync(
        async (req: Request, res: Response, next: NextFunction) => {

            const token = req.headers.authorization

            if (!token) {
                throwError('you are Unauthorized')
            }

            jwt.verify(token as string, config.jwt_Token as string,
                function (err, decoded) {
                    if (err) {
                        throwError('you are Unauthorized')
                    }


                    req.user = decoded as JwtPayload
                    next()
                }

            )


        }
    )
}


export default authRequestValidator