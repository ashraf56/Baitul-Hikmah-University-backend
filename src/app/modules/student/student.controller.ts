import {   RequestHandler, } from "express";
import { StudentService } from "./student.service";
import { catchasync } from "../../utils/catchAsync";


// const createStudents = async (req: Request, res: Response) => {
//     try {
//         const student = req.body;
//         const { error, value } = studentValidationSchema.validate(student)


//         // StudentService.createStudentintoDB it is service for createstudent controller 
//         const result = await StudentService.createStudentintoDB(value)

//         if (error) {
//             res.status(500).json({
//                 message: "validation  error",
//                 error: error
//             })
//         }

//         res.status(200).json({
//             message: "data success",
//             data: result
//         })
//     } catch (error) {


//         res.status(500).json({
//             message: "something error",
//             error: error
//         })
//     }

// }

 
const deletStudent:RequestHandler = async (req, res) => {
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

const getAllstudent :RequestHandler= catchasync(

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {

           const result = await StudentService.getStudentsFromDB()
            res.status(200).json({ result })
      
    }
)

export const StudentController = {
    getAllstudent, deletStudent
}