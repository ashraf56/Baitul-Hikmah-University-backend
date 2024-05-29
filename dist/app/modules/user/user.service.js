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
exports.UserService = void 0;
const academic_model_1 = require("../academicSemister/academic.model");
const student_schema_1 = __importDefault(require("../student/student.schema"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = require("./user.utils");
const CreateUserDB = (password, student) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserdata = {};
    newUserdata.password = password || 'abc123';
    newUserdata.role = 'student';
    const admissionSemester = yield academic_model_1.AcademicSemesterModel.findById(student.admissionSemester);
    if (!admissionSemester) {
        throw new Error('Admission semester not found');
    }
    newUserdata.id = yield (0, user_utils_1.genarateSudentID)(admissionSemester);
    // it will create new user in the user colleciton
    const newUser = yield user_model_1.default.create(newUserdata);
    if (Object.keys(newUser).length) {
        student.id = newUser.id;
        student.userid = newUser._id;
        // it will create student in the strudents collection
        const strudents = yield student_schema_1.default.create(student);
        return strudents;
    }
});
exports.UserService = {
    CreateUserDB
};
