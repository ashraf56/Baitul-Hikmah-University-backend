import { catchasync } from "../../utils/catchAsync";
import { academicDepartmentService } from "./department.service";

const createAcademicDepartmentController = catchasync(
    async (req, res) => {
        const payload = req.body;
        const departmentdata = await academicDepartmentService.createAcademicDepartmentintoDB(payload)

        res.status(200).json({
            success: true,
            message: "new faculty created",
            data: departmentdata
        })

    }
)



export const academicDepartmentCOntrollers = {
    createAcademicDepartmentController
}