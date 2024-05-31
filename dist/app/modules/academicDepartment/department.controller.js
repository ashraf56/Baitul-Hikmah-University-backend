"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentCOntrollers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const department_service_1 = require("./department.service");
const createAcademicDepartmentController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const departmentdata = yield department_service_1.academicDepartmentService.createAcademicDepartmentintoDB(payload);
    res.status(200).json({
        success: true,
        message: "new department created",
        data: departmentdata
    });
}));
const getAllAcademicDepartmentController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield department_service_1.academicDepartmentService.getAllAcademicDepartmentsFromDB();
    res.status(200).json({
        success: true,
        message: "academic departments are retrieved successfully",
        data: result
    });
}));
const getSingleAcademicDepartmentController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { departmentId } = req.params;
    const result = yield department_service_1.academicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId);
    res.status(200).json({
        success: true,
        message: "academic departments is retrieved successfully",
        data: result
    });
}));
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
exports.academicDepartmentCOntrollers = {
    createAcademicDepartmentController,
    getAllAcademicDepartmentController,
    getSingleAcademicDepartmentController
};
