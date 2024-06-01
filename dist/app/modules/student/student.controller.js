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
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const catchAsync_1 = require("../../utils/catchAsync");
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
const deletStudentController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield student_service_1.StudentService.deleteStudentFromDB(id);
    res.status(200).json({
        message: "Student deleted success",
        data: result
    });
}));
const getAllstudent = (0, catchAsync_1.catchasync)(
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.StudentService.getStudentsFromDB();
    res.status(200).json({ result });
}));
exports.StudentController = {
    getAllstudent, deletStudentController
};
