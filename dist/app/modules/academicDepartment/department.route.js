"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const department_validatin_1 = require("./department.validatin");
const department_controller_1 = require("./department.controller");
const router = (0, express_1.Router)();
router.post('/create-department', (0, validateRequest_1.default)(department_validatin_1.academicDepartmentValidation.createAcademicDepartmentValidationSchema), department_controller_1.academicDepartmentCOntrollers.createAcademicDepartmentController);
