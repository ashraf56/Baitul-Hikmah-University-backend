"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentZODSchema = exports.createStudentsInfoZODSchema = exports.GardianSchema = void 0;
const zod_1 = require("zod");
exports.GardianSchema = zod_1.z.object({
    fathersName: zod_1.z.string().trim().optional(),
    fathersNumber: zod_1.z.string().trim().optional()
});
exports.createStudentsInfoZODSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.string().trim().max(20, 'name cannot exceed 20 characters'),
            adress: zod_1.z.string().optional(),
            contactnumber: zod_1.z.string().trim().optional(),
            country: zod_1.z.string().trim().optional(),
            gender: zod_1.z.enum(['male', 'female']).optional(),
            gardian: exports.GardianSchema.optional(),
            admissionSemester: zod_1.z.string().optional(),
        })
    })
});
exports.StudentZODSchema = {
    createStudentsInfoZODSchema: exports.createStudentsInfoZODSchema
};
