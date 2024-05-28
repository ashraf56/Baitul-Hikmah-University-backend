/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { catchasync } from "../../utils/catchAsync";


const createUsers = catchasync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next:NextFunction) => {
     
            const { password, student } = req.body;
            
            const newusers = await UserService.CreateUserDB(password, student);
    
            res.status(200).json({
                success: true,
                message: "success",
                data: newusers
    
            })
    
    
        
    }
)



export const UserController = {
    createUsers
}