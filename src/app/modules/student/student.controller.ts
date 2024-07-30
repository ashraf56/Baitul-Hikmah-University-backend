import { RequestHandler, } from "express";
import { StudentService } from "./student.service";
import { catchasync } from "../../utils/catchAsync";
import httpStatus from "http-status";


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


const deletStudentController = catchasync(
    async (req, res) => {
        const { id } = req.params;
        const result = await StudentService.deleteStudentFromDB(id)
        res.status(200).json({
            message: "Student deleted success",
            data: result
        })
    }
)
const getSingleStudentController = catchasync(
    async (req, res) => {
        const { id } = req.params;
        const result = await StudentService.getSingleStudentFromDB(id)
        res.status(httpStatus.OK).json({
            message: "Single Student data retrive successfully",
            data: result
        })
    }
)

const getAllstudent: RequestHandler = catchasync(

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    async (req, res, next) => {

        const result = await StudentService.getStudentsFromDB(req.query)
        res.status(200).json({ result })

    }
)

export const StudentController = {
    getAllstudent, deletStudentController,getSingleStudentController
}