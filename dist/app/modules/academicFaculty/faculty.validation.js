"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcdemicFacultyValidation = void 0;
const zod_1 = require("zod");
const createAcdemicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Password must be string',
        })
    })
});
exports.AcdemicFacultyValidation = {
    createAcdemicFacultyValidationSchema
};
