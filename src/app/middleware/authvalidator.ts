import { NextFunction, Request, Response } from "express"
import { catchasync } from "../utils/catchAsync"
import { throwError } from "../utils/throwError"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { UserRoletypes } from "../modules/user/user.interface"
import User from "../modules/user/user.model"
import httpStatus from "http-status"
import ErrorApp from "../errors/ErrorApp"

const authRequestValidator =  (...requireRole: UserRoletypes[]) => {
    return catchasync(
        async (req: Request, res: Response, next: NextFunction) => {
            // retrive token 
            const token = req.headers.authorization as string

         


            if (!token || !token.startsWith('Bearer')) {
                throw new ErrorApp( 401,"you are Unauthorized")
            }



            const tokenFormated = token.startsWith('Bearer') ? token : `Bearer${token}`

            const accessToken = tokenFormated.split(' ')[1]
            if (!accessToken) {
                throw new ErrorApp( httpStatus.UNAUTHORIZED,"you are Unauthorized")
            }

            // token  varification
         let decoded;
          try {
              decoded = jwt.verify(accessToken, config.jwt_Token as string) as JwtPayload
        
           
          } catch (error) {
            throw new ErrorApp( httpStatus.UNAUTHORIZED,"you are Unauthorized")

          }
           
           
            const { id, role, iat } = decoded!

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

            if (user.passwordChangedAt && User.is_jwt_Issued_Before_Password_Change(
                user.passwordChangedAt, iat as number

            )) {
                throwError('you are Unauthorized')
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