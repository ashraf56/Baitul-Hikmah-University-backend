"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseFaculty = exports.Course = exports.preRequisiteCoursesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.preRequisiteCoursesSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String, unique: true,
        trim: true,
        required: true,
    },
    prefix: {
        type: String,
        trim: true,
        required: true,
    },
    code: {
        type: Number,
        trim: true,
        required: true,
    },
    credits: {
        type: Number,
        trim: true,
        required: true,
    },
    preRequisiteCourses: [exports.preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});
const CourseFacultySchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        unique: true,
    },
    faculties: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Faculty'
        }
    ]
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
exports.CourseFaculty = (0, mongoose_1.model)('CourseFaculty', CourseFacultySchema);
