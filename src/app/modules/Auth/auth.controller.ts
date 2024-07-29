import httpStatus from "http-status";
import config from "../../config";
import { catchasync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";


const LoginUserController = catchasync(
    async (req, res) => {

        const result = await AuthService.LoginUSer(req.body)

        const { refreshToken, accessToken, needPasswordChange } = result;

        res.cookie('refreshToken', refreshToken, {
            secure: config.node_Env === 'production',
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Login success",
            data: {
                accessToken,
                needPasswordChange
            }
        })
    }
)

const ChangepassController = catchasync(
    async (req, res) => {

        const { ...password } = req.body
        const result = await AuthService.changePasswordDB(req.user, password)
        res.status(200).json({
            success: true,
            message: "Password changed success",
            data: result
        })
    }
)


const RefreshTokenController = catchasync(
    async (req, res) => {
        const { refreshToken } = req.cookies
        const result = await AuthService.RefreshTokenDB(refreshToken)
        res.status(200).json({
            success: true,
            message: "Access token is retrieved succesfully!",
            data: result
        })

    }
)

const forgetPasswordController = catchasync(async (req, res) => {
    const userId = req.body.id;
    const result = await AuthService.forgetPasswordDB(userId);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Reset link is generated succesfully!",
        data: result
    })

});
const resetPasswordController = catchasync(async (req, res) => {
  
    const token = req.headers.authorization as string
    const result = await AuthService.resetPasswordDB(req.body,token);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Reset link is generated succesfully!",
        data: result
    })

});

export const AuthController = {
    LoginUserController,
    ChangepassController,
    RefreshTokenController,
    forgetPasswordController,
    resetPasswordController
}