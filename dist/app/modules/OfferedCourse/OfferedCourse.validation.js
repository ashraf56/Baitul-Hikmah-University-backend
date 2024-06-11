"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseValidations = void 0;
const zod_1 = require("zod");
const OfferedCourse_constant_1 = require("./OfferedCourse.constant");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // 00-09 10-19 20-23
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
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
        startTime: timeStringSchema, // HH: MM   00-23: 00-59
        endTime: timeStringSchema,
    }).refine((body) => {
        const start = new Date(`2000T${body.startTime}`);
        const end = new Date(`2000T${body.endTime}`);
        return end > start;
    }, {
        message: 'Start time should be before End time !  '
    })
});
exports.OfferedCourseValidations = {
    createOfferedCoursevalidation
};
