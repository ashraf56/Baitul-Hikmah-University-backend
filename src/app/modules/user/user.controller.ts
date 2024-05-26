import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";


const createUsers = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { password, student } = req.body;
        const newusers = await UserService.CreateUserDB(password, student);

        res.status(200).json({
            success: true,
            message: "success",
            data: newusers

        })


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
       next(error)
    }
}



export const UserController = {
    createUsers
}