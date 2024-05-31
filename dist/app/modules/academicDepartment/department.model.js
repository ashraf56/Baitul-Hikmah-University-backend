"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicDepartmentSChema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicFacultyModel"
    }
});
const academicDepartmentModel = (0, mongoose_1.model)('AcademicDepartment', academicDepartmentSChema);
exports.default = academicDepartmentModel;
