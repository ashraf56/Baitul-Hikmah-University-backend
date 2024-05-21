import { Request, Response } from "express";
import { StudentService } from "./student.service";
import studentValidationSchema from "./student.validation";


const createStudents = async (req: Request, res: Response) => {
    try {
        const student = req.body;
        const { error, value } = studentValidationSchema.validate(student)


        // StudentService.createStudentintoDB it is service for createstudent controller 
        const result = await StudentService.createStudentintoDB(value)

        if (error) {
            res.status(500).json({
                message: "validation  error",
                error: error
            })
        }

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

const deletStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await StudentService.getdeletStudent(id)

        res.status(200).json({
            message: "data delete success",
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
    createStudents, getAllstudent, deletStudent
}