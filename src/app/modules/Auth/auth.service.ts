import User from "../user/user.model";
import { AuthUserInterface } from "./auth.interface";


const LoginUSer = async (payload:AuthUserInterface)=>{

const isUser =await User.findOne({id:payload.id})

console.log(isUser);
}




export const AuthService = {
    LoginUSer
}