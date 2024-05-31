import { catchasync } from "../../utils/catchAsync";
import { academicDepartmentService } from "./department.service";

const createAcademicDepartmentController = catchasync(
    async (req, res) => {
        const payload = req.body;
        const departmentdata = await academicDepartmentService.createAcademicDepartmentintoDB(payload)

        res.status(200).json({
            success: true,
            message: "new department created",
            data: departmentdata
        })

    }
)
const getAllAcademicDepartmentController = catchasync(async (req, res) => {
    const result = await academicDepartmentService.getAllAcademicDepartmentsFromDB();
    res.status(200).json({
        success: true,
        message: "cademic departments are retrieved successfully",
        data: result
    })

});


export const academicDepartmentCOntrollers = {
    createAcademicDepartmentController,
    getAllAcademicDepartmentController
}