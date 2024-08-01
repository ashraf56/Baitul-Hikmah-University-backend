"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enrollCourese_constant_1 = require("./enrollCourese.constant");
const courseMarksSchema = new mongoose_1.Schema({
    classTest1: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    midTerm: {
        type: Number,
        min: 0,
        max: 30,
        default: 0,
    },
    classTest2: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    finalTerm: {
        type: Number,
        min: 0,
        max: 50,
        default: 0,
    },
}, {
    _id: false,
});
const enrollCoureseSchema = new mongoose_1.Schema({
    semisterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SemesterRegistration',
        required: true,
    },
    academicSemister: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    OfferedCourse: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'OfferedCourse',
        required: true,
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    isEnrolled: {
        type: Boolean,
        required: true,
    },
    courseMarks: {
        type: courseMarksSchema,
        default: {},
    },
    grade: {
        type: String,
        enum: enrollCourese_constant_1.Grade,
        default: 'NA',
    },
    gradePoints: {
        type: Number,
        min: 0,
        max: 4,
        default: 0,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});
const EnrollCourese = (0, mongoose_1.model)('EnrollCourese', enrollCoureseSchema);
exports.default = EnrollCourese;
