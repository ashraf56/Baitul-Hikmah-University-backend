import { throwError } from "../../utils/throwError";
import User from "../user/user.model";
import { AuthUserInterface } from "./auth.interface";
import bcrypt from 'bcrypt';


const LoginUSer = async (payload: AuthUserInterface) => {

    const isUser = await User.findOne({ id: payload.id })
    if (!isUser) {
        throw new Error("User not found")
    }

    const isDeletedUser = isUser?.isDeleted

    if (isDeletedUser) {
        throwError("User is Deleted")
    }

    const userStatus = isUser?.status
    if (userStatus === 'blocked') {
        throwError("User is blocked")
    }

// cheking password matching

const isPasswordmatch = await bcrypt.compare(payload.password,isUser.password)

 if (!isPasswordmatch) {
    throwError('password not matched')
 }






}




export const AuthService = {
    LoginUSer
}