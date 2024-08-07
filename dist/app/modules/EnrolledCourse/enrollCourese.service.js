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
exports.EnrollCoureseService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ErrorApp_1 = __importDefault(require("../../errors/ErrorApp"));
const OfferedCourse_model_1 = require("../OfferedCourse/OfferedCourse.model");
const student_schema_1 = __importDefault(require("../student/student.schema"));
const enrollCourese_model_1 = __importDefault(require("./enrollCourese.model"));
const course_model_1 = require("../course/course.model");
const semisterRagistration_model_1 = require("../semisterRegistration/semisterRagistration.model");
const mongoose_1 = require("mongoose");
const faculty_model_1 = require("../faculty/faculty.model");
const enrollCourse_utill_1 = require("./enrollCourse.utill");
const createEnrolledCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { offeredCourse } = payload;
    const isOfferedCourseExists = yield OfferedCourse_model_1.OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new ErrorApp_1.default(http_status_1.default.NOT_FOUND, 'Offered course not found !');
    }
    if (isOfferedCourseExists.maxCapacity <= 0) {
        throw new ErrorApp_1.default(http_status_1.default.BAD_GATEWAY, 'Room is full !');
    }
    const student = yield student_schema_1.default.findOne({ id: id }, { _id: 1 });
    if (!student) {
        throw new ErrorApp_1.default(http_status_1.default.BAD_GATEWAY, 'Student not found ! !');
    }
    // checking student already enrolled or not 
    const isStudentAlreadyEnrolled = yield enrollCourese_model_1.default.findOne({
        semesterRegistration: isOfferedCourseExists === null || isOfferedCourseExists === void 0 ? void 0 : isOfferedCourseExists.semesterRegistration,
        offeredCourse,
        student: student._id,
    });
    if (isStudentAlreadyEnrolled) {
        throw new ErrorApp_1.default(http_status_1.default.CONFLICT, 'Student is already enrolled !');
    }
    // check total credits exceeds maxCredit
    const course = yield course_model_1.Course.findById(isOfferedCourseExists.course);
    const currentCredit = course === null || course === void 0 ? void 0 : course.credits;
    const semesterRegistration = yield semisterRagistration_model_1.SemesterRegistration.findById(isOfferedCourseExists.semesterRegistration).select('maxCredit');
    const maxCredit = semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.maxCredit;
    const enrolledCourses = yield enrollCourese_model_1.default.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExists.semesterRegistration,
                student: student._id,
            },
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'Course',
                foreignField: '_id',
                as: 'enrolledCourseData',
            },
        },
        {
            $unwind: '$enrolledCourseData',
        },
        {
            $group: {
                _id: null,
                totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
            },
        },
        {
            $project: {
                _id: 0,
                totalEnrolledCredits: 1,
            },
        },
    ]);
    //  total enrolled credits + new enrolled course credit > maxCredit
    const totalCredits = enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
    if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
        throw new ErrorApp_1.default(http_status_1.default.BAD_REQUEST, 'You have exceeded maximum number of credits !');
    }
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const result = yield enrollCourese_model_1.default.create([
            {
                semisterRegistration: isOfferedCourseExists.semesterRegistration,
                academicSemister: isOfferedCourseExists.academicSemester,
                academicFaculty: isOfferedCourseExists.academicFaculty,
                academicDepartment: isOfferedCourseExists.academicDepartment,
                offeredCourse: offeredCourse,
                course: isOfferedCourseExists.course,
                student: student._id,
                faculty: isOfferedCourseExists.faculty,
                isEnrolled: true,
            },
        ], { session });
        if (!result) {
            throw new ErrorApp_1.default(http_status_1.default.BAD_REQUEST, 'Failed to enroll in this cousre !');
        }
        const maxCapacity = isOfferedCourseExists.maxCapacity;
        yield OfferedCourse_model_1.OfferedCourse.findByIdAndUpdate(offeredCourse, {
            maxCapacity: maxCapacity - 1,
        });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const updateEnrolledCourseMarksIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semisterRegistration, offeredCourse, student, courseMarks } = payload;
    const isSemesterRegistrationExists = yield semisterRagistration_model_1.SemesterRegistration.findById(semisterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new ErrorApp_1.default(http_status_1.default.NOT_FOUND, 'Semester registration not found !');
    }
    const isOfferedCourseExists = yield OfferedCourse_model_1.OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new ErrorApp_1.default(http_status_1.default.NOT_FOUND, 'Offered course not found !');
    }
    const isStudentExists = yield student_schema_1.default.findById(student);
    if (!isStudentExists) {
        throw new ErrorApp_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const faculty = yield faculty_model_1.Faculty.findOne({ id: id }, { _id: 1 });
    if (!faculty) {
        throw new ErrorApp_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found !');
    }
    const isCourseBelongToFaculty = yield enrollCourese_model_1.default.findOne({
        semisterRegistration,
        offeredCourse,
        student,
        faculty: faculty._id,
    });
    if (!isCourseBelongToFaculty) {
        throw new ErrorApp_1.default(http_status_1.default.FORBIDDEN, 'You are forbidden! !');
    }
    const modifiedData = Object.assign({}, courseMarks);
    if (courseMarks === null || courseMarks === void 0 ? void 0 : courseMarks.finalTerm) {
        const { classTest1, classTest2, midTerm, finalTerm } = isCourseBelongToFaculty.courseMarks;
        const totalMarks = Math.ceil(classTest1 * 0.1) +
            Math.ceil(midTerm * 0.3) +
            Math.ceil(classTest2 * 0.1) +
            Math.ceil(finalTerm * 0.5);
        const result = (0, enrollCourse_utill_1.calculateGradeAndPoints)(totalMarks);
        console.log({ totalMarks });
        console.log({ result });
        modifiedData.grade = result.grade;
        modifiedData.gradePoints = result.gradePoints;
        modifiedData.isCompleted = true;
    }
    if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedData[`courseMarks.${key}`] = value;
        }
    }
    const result = yield enrollCourese_model_1.default.findByIdAndUpdate(isCourseBelongToFaculty._id, modifiedData, {
        new: true,
    });
    return result;
});
exports.EnrollCoureseService = {
    createEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB
};
