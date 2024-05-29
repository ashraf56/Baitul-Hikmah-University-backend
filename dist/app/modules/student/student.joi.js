"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const studentValidationSchema = joi_1.default.object({
    id: joi_1.default.string().required().messages({
        'any.required': 'ID is required',
    }),
    password: joi_1.default.string().required().max(10).trim(),
    name: joi_1.default.string().required().max(20).trim(),
    adress: joi_1.default.string().optional(),
    contactnumber: joi_1.default.string().trim().optional(),
    country: joi_1.default.string().trim().optional(),
    gender: joi_1.default.string().valid('male', 'female').required().messages({
        'any.only': 'The gender field must be only male and female',
        'any.required': 'Gender is required'
    }),
    gardian: joi_1.default.object({
        fathersName: joi_1.default.string().trim().optional(),
        fathersNumber: joi_1.default.string().trim().optional()
    }).optional(),
    isDeleted: joi_1.default.boolean().optional()
});
exports.default = studentValidationSchema;
