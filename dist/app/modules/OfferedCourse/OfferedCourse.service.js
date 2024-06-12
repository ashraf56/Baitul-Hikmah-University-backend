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
exports.OfferedCourseServices = void 0;
const department_model_1 = __importDefault(require("../academicDepartment/department.model"));
const academicfaculty_model_1 = __importDefault(require("../academicFaculty/academicfaculty.model"));
const course_model_1 = require("../course/course.model");
const faculty_model_1 = require("../faculty/faculty.model");
const semisterRagistration_model_1 = require("../semisterRegistration/semisterRagistration.model");
const OfferedCourse_model_1 = require("./OfferedCourse.model");
const OfferedCourse_utils_1 = require("./OfferedCourse.utils");
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { academicDepartment, academicFaculty, section, semesterRegistration, course, faculty, days, startTime, endTime } = payload;
    const isSemesterRegistrationExists = yield semisterRagistration_model_1.SemesterRegistration.findById(payload.semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new Error('semesterRegistration not found');
    }
    const academicSemester = isSemesterRegistrationExists.academicSemester;
    const isacademicFaculty = yield academicfaculty_model_1.default.findById(payload.academicFaculty);
    if (!isacademicFaculty) {
        throw new Error('academicFaculty not found');
    }
    const isacademicDepartment = yield department_model_1.default.findById(payload.academicDepartment);
    if (!isacademicDepartment) {
        throw new Error('academicDepartment not found');
    }
    const isacourse = yield course_model_1.Course.findById(payload.course);
    if (!isacourse) {
        throw new Error('course not found');
    }
    const isfaculty = yield faculty_model_1.Faculty.findById(payload.faculty);
    if (!isfaculty) {
        throw new Error('faculty not found');
    }
    // if academic dep is not belog into the academic faculty 
    const isAcademicDepartment_belog_to_academicFaculty = yield department_model_1.default.findOne({
        _id: academicDepartment, academicFaculty
    });
    if (!isAcademicDepartment_belog_to_academicFaculty) {
        throw new Error(`${isacademicDepartment.name} is not belog into ${isacademicFaculty.name}`);
    }
    // checking for same section course and semister reg
    const isSame_SemisterReg_Section_Course = yield OfferedCourse_model_1.OfferedCourse.findOne({
        section, semesterRegistration, course
    });
    if (isSame_SemisterReg_Section_Course) {
        throw new Error(`Offered course with same section is already exist!`);
    }
    const assignedSchedules = yield OfferedCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select(' days startTime endTime');
    const newSchedule = {
        days,
        startTime, endTime
    };
    if ((0, OfferedCourse_utils_1.timeConflict)(assignedSchedules, newSchedule)) {
        throw new Error('This faculty is not available at that time ! Choose other time or day');
    }
    const result = yield OfferedCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
exports.OfferedCourseServices = {
    createOfferedCourseIntoDB
};
