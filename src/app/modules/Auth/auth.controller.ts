import config from "../../config";
import { catchasync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";


const LoginUserController = catchasync(
    async(req,res)=>{
        
        const result = await AuthService.LoginUSer(req.body)

        const { refreshToken, accessToken, needPasswordChange } = result;

        res.cookie('refreshToken', refreshToken, {
          secure: config.node_Env === 'production',
          httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message:"Login success",
            data:{
                accessToken,
                needPasswordChange
            }
        })
    }
)

const ChangepassController = catchasync(
    async(req,res)=>{
      
        const {...password}  = req.body
        const result = await AuthService.changePasswordDB(req.user,password)
        res.status(200).json({
            success: true,
            message:"Password changed success",
            data:result
        })
    }
)



export const AuthController = {
    LoginUserController,
    ChangepassController
}