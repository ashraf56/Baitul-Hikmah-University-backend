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
        message: "academic departments are retrieved successfully",
        data: result
    })

});

const getSingleAcademicDepartmentController = catchasync(async (req, res) => {
    const { departmentId } = req.params;
    const result =
      await academicDepartmentService.getSingleAcademicDepartmentFromDB(
        departmentId,
      );
  
      res.status(200).json({
        success: true,
        message: "academic departments is retrieved successfully",
        data: result
    })
  });
  
//   const updateAcademicDeartment = catchAsync(async (req, res) => {
//     const { departmentId } = req.params;
//     const result =
//       await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
//         departmentId,
//         req.body,
//       );
  
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Academic department is updated succesfully',
//       data: result,
//     });
//   });

export const academicDepartmentCOntrollers = {
    createAcademicDepartmentController,
    getAllAcademicDepartmentController,
    getSingleAcademicDepartmentController
}