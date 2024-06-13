import { NextFunction, Request, Response } from "express"
import { catchasync } from "../utils/catchAsync"
import { throwError } from "../utils/throwError"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { UserRoletypes } from "../modules/user/user.interface"
import User from "../modules/user/user.model"

const authRequestValidator = (...requireRole: UserRoletypes[]) => {
    return catchasync(
        async (req: Request, res: Response, next: NextFunction) => {
            // retrive token 
            const token = req.headers.authorization as string

            if (!token) {
                throwError('you are Unauthorized')
            }



            // token  varification
            const decoded = jwt.verify(token, config.jwt_Token as string) as JwtPayload

            const { id, role } = decoded

            const user = await User.isUserExistsByCustomId(id)


            if (!user) {
                throwError("User not found")
            }

            const isDeletedUser = user?.isDeleted

            if (isDeletedUser) {
                throwError("User is Deleted")
            }

            const userStatus = user?.status
            if (userStatus === 'blocked') {
                throwError("User is blocked")
            }



            // set role based Authorization
            if (requireRole && !requireRole.includes(role)) {
                throwError('you are Unauthorized')
            }


            req.user = decoded as JwtPayload
            next()


        }
    )
}


export default authRequestValidator