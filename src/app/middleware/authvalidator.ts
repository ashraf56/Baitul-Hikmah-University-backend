import { NextFunction, Request, Response } from "express"
import { catchasync } from "../utils/catchAsync"
import { throwError } from "../utils/throwError"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { UserRoletypes } from "../modules/user/user.interface"

const authRequestValidator = (...requireRole: UserRoletypes[]) => {
    return catchasync(
        async (req: Request, res: Response, next: NextFunction) => {
            // retrive token 
            const token = req.headers.authorization

            if (!token) {
                throwError('you are Unauthorized')
            }
            // token  varification
            jwt.verify(token as string, config.jwt_Token as string,
                function (err, decoded) {
                    if (err) {
                        throwError('you are Unauthorized')
                    }


             // set role based Authorization
                    if (requireRole && !requireRole.includes((decoded as JwtPayload)?.role)) {
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