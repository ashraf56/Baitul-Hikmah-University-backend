"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseValidations = void 0;
const zod_1 = require("zod");
const OfferedCourse_constant_1 = require("./OfferedCourse.constant");
const createOfferedCoursevalidation = zod_1.z.object({
    body: zod_1.z.object({
        semesterRegistration: zod_1.z.string(),
        academicFaculty: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        course: zod_1.z.string(),
        faculty: zod_1.z.string(),
        section: zod_1.z.number(),
        maxCapacity: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...OfferedCourse_constant_1.Days])),
        startTime: zod_1.z.string(), // HH: MM   00-23: 00-59
        endTime: zod_1.z.string(),
    })
});
exports.OfferedCourseValidations = {
    createOfferedCoursevalidation
};
