"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AcademicFacultySchema = new mongoose_1.Schema({
    name: {
        type: String, required: true
    }
}, {
    timestamps: true
});
const AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', AcademicFacultySchema);
exports.default = AcademicFaculty;
