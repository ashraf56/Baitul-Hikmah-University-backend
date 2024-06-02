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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const mongoose_1 = require("mongoose");
const student_schema_1 = __importDefault(require("./student.schema"));
const user_model_1 = __importDefault(require("../user/user.model"));
// const createStudentintoDB = async (student: StudentsInfo) => {
//     // it is used for create a data  from StudentsModal into DB 
//     // const result = await StudentsModal.create(student) // built in static instamce method 
//     const result = new StudentsModal(student)
//     const res = result.save()
//     return res
// }
// const getdeletStudent = async (id: string) => {
//     const res = await Student.updateOne({ id }, { isDeleted: true })
//     return res
// }
const getStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const rss = yield student_schema_1.default.find().populate('admissionSemester');
    return rss;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const deletstudent = yield student_schema_1.default.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletstudent) {
            throw new Error('Delete transition is faild');
        }
        const deletuser = yield user_model_1.default.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletuser) {
            throw new Error('Delete transition is faild');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletstudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to delete student');
    }
});
exports.StudentService = {
    getStudentsFromDB, deleteStudentFromDB
};
