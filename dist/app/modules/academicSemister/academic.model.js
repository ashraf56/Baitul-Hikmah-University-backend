"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academic_constant_1 = require("./academic.constant");
const academicSemisterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: academic_constant_1.AcademicSemesterName
    },
    year: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        enum: academic_constant_1.AcademicSemesterCode,
    },
    startMonth: {
        type: String,
        required: true,
        enum: academic_constant_1.Months,
    },
    endMonth: {
        type: String,
        required: true,
        enum: academic_constant_1.Months,
    },
}, {
    timestamps: true,
});
const AcademicSemesterModel = (0, mongoose_1.model)('academicsemister', academicSemisterSchema);
exports.default = AcademicSemesterModel;
