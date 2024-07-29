/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { catchasync } from "../../utils/catchAsync";
import httpStatus from "http-status";


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

        const { password, admin } = req.body;


        const newAdmin = await UserService.createAdminIntoDB(password, admin);

        res.status(200).json({
            success: true,
            message: "success",
            data: newAdmin

        })



    }
)

const getMeCOntroller = catchasync(
    async (req, res) => {
        const { id, role } = req.user;

        const result = await UserService.getMe(id, role)

        res.status(httpStatus.OK).json({
            success: true,
            message: "success",
            data: result

        })

    }
)



export const UserController = {
    createUsers, createFaculty, createAdmin, getMeCOntroller
}