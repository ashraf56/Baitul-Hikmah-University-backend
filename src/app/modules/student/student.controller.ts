import { Request, Response } from "express";
import { StudentService } from "./student.service";


const createStudents = async (req: Request, res: Response) => {
    try {
        const student = req.body;
        // StudentService.createStudentintoDB it is service for createstudent controller 
        const result = await StudentService.createStudentintoDB(student)

        res.status(200).json({
            message: "data success",
            data: result
        })
    } catch (error) {


        res.status(500).json({
            message: "something error",
            error: error
        })
    }

}

const getAllstudent = async (req: Request, res: Response) => {

    try {

        const result = await StudentService.getStudentsFromDB()
        res.status(200).json({ result })


    } catch (error) {
        res.status(500).json({
            message: "something error",
            error: error
        })
    }
}


export const StudentController = {
    createStudents, getAllstudent
}