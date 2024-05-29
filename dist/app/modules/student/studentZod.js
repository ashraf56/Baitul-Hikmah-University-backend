"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const GardianSchema = zod_1.z.object({
    fathersName: zod_1.z.string().trim().optional(),
    fathersNumber: zod_1.z.string().trim().optional()
});
const StudentsInfoZODSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string().trim().min(1, 'name is required here').max(20, 'name cannot exceed 20 characters'),
        password: zod_1.z.string().optional(),
        adress: zod_1.z.string().optional(),
        contactnumber: zod_1.z.string().trim().optional(),
        country: zod_1.z.string().trim().optional(),
        gender: zod_1.z.enum(["male", "female"], {
            errorMap: () => ({ message: "The gender field must be only male and female" })
        }),
        gardian: GardianSchema.optional()
    })
});
exports.default = StudentsInfoZODSchema;
