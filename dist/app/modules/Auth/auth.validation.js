"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authvalidations = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'Id is required.' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const changePassValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'Old Password is required.' }),
        newpassword: zod_1.z.string({ required_error: 'newPassword is required' }),
    }),
});
exports.Authvalidations = {
    loginValidationSchema,
    changePassValidationSchema
};
