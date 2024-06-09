/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { catchasync } from "../../utils/catchAsync";


const createUsers = catchasync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {

        const { password, student } = req.body;


        const newusers = await UserService.CreateUserDB(password, student);

        res.status(200).json({
            success: true,
            message: "success",
            data: newusers

        })



    }
)
const createFaculty = catchasync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req, res, next) => {

        const { password, faculty } = req.body;


    
       
        const newfaculty = await UserService.CreateFacultyDB(password, faculty);
      
       
        res.status(200).json({
            success: true,
            message: "success",
            data: newfaculty

        })



    }
)



const createAdmin = catchasync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {

        const { password, payload } = req.body;


        const newfaculty = await UserService.createAdminIntoDB(password, payload);

        res.status(200).json({
            success: true,
            message: "success",
            data: newfaculty

        })



    }
)


export const UserController = {
    createUsers,createFaculty,createAdmin
}