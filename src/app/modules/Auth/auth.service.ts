import config from "../../config";
import { throwError } from "../../utils/throwError";
import User from "../user/user.model";
import { AuthUserInterface } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken"
import bcrypt from 'bcrypt';
import { sendEmail } from "../../utils/sendEmil";

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

    const datapayload = {
        id: user.id,
        role: user.role
    }

    const accessToken = jwt.sign(datapayload, config.jwt_Token as string, { expiresIn: '10D' });
    const refreshToken = jwt.sign(datapayload, config.JWT_Refresh_token as string, { expiresIn: '365D' });


    return {
        accessToken,
        needPasswordChange: user?.needsPasswordChange,
        refreshToken
    }


}


const changePasswordDB = async (userdata: JwtPayload, payload: { oldPassword: string, newpassword: string }) => {

    const user = await User.isUserExistsByCustomId(userdata.id)


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

    const isPasswordmatch = await User.isPasswordMatch(payload?.oldPassword, user?.password)

    if (!isPasswordmatch) {
        throwError('password not matched')
    }
    const newHashpassword = await bcrypt.hash(payload.newpassword, Number(config.saltNumber))

    await User.findOneAndUpdate({
        id: userdata.id,
        role: userdata.role
    },
        {
            password: newHashpassword,
            needsPasswordChange: false,
            passwordChangedAt: new Date()

        }

    )

    return null
}


// it will create an accesstoken from Refreshtoken.
const RefreshTokenDB = async (token: string) => {
    if (!token) {
        throwError('you are Unauthorized')
    }

    // token  varification
    const decoded = jwt.verify(token, config.JWT_Refresh_token as string) as JwtPayload

    const { id, iat } = decoded

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

    const datapayload = {
        id: user.id,
        role: user.role
    }

    const accessToken = jwt.sign(datapayload, config.jwt_Token as string, { expiresIn: '1D' });


    return { accessToken }
}

const forgetPasswordDB = async (id: string) => {
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

    const datapayload = {
        id: user.id,
        role: user.role
    }

    const accessToken = jwt.sign(datapayload, config.jwt_Token as string, { expiresIn: '1h' });

    const resetULlink = `${config.FrogetPassUr}?id=${user.id}&token=${accessToken}`
    sendEmail(user.email, resetULlink)


}
const resetPasswordDB = async (payload:{id:string,newpassword:string},token:string) => {

    const user = await User.isUserExistsByCustomId(payload.id)

   console.log(token);
   
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

   



}



export const AuthService = {
    LoginUSer,
    changePasswordDB,
    RefreshTokenDB,
    forgetPasswordDB,
    resetPasswordDB
}