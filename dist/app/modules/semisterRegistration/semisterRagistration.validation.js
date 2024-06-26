"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semisterRagistrationValidation = void 0;
const zod_1 = require("zod");
const semisterRagistration_constants_1 = require("./semisterRagistration.constants");
const createSemesterRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string(),
        status: zod_1.z.enum([...semisterRagistration_constants_1.SemesterRegistrationStatus]),
        startDate: zod_1.z.string().datetime(),
        endDate: zod_1.z.string().datetime(),
        minCredit: zod_1.z.number(),
        maxCredit: zod_1.z.number(),
    }),
});
const upadateSemesterRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string().optional(),
        status: zod_1.z.enum([...semisterRagistration_constants_1.SemesterRegistrationStatus]).optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        minCredit: zod_1.z.number().optional(),
        maxCredit: zod_1.z.number().optional(),
    }),
});
exports.semisterRagistrationValidation = {
    createSemesterRegistrationValidationSchema,
    upadateSemesterRegistrationValidationSchema
};
