import { throwError } from "../../utils/throwError";
import User from "../user/user.model";
import { AuthUserInterface } from "./auth.interface";


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

}




export const AuthService = {
    LoginUSer
}