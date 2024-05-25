import { UserInterface } from "./user.interface";
import UserModel from "./user.model";


const CreateUserDB =async (user:UserInterface) => {

const users = await UserModel.create(user)

return users
}



export const UserService = {
    CreateUserDB
}