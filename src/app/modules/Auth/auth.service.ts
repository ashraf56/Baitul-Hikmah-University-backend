import config from "../../config";
import { throwError } from "../../utils/throwError";
import User from "../user/user.model";
import { AuthUserInterface } from "./auth.interface";
import jwt from "jsonwebtoken"

const LoginUSer = async (payload: AuthUserInterface) => {

    const user = await User.isUserExistsByCustomId(payload.id)

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

    // cheking password matching

    const isPasswordmatch = await User.isPasswordMatch(payload?.password, user?.password)

    if (!isPasswordmatch) {
        throwError('password not matched')
    }
// jwt

const datapayload ={
    id:user.id,
    role:user.role
}

const accessToken = jwt.sign(datapayload, config.jwt_Token as string, { expiresIn: '1h' });


return{
    accessToken,
    needPasswordChange:user?.needsPasswordChange
}


}




export const AuthService = {
    LoginUSer
}