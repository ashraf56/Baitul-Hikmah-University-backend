"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRouter = void 0;
const express_1 = require("express");
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const router = (0, express_1.Router)();
router.post('/create-faculty', (0, validateRequest_1.default)(faculty_validation_1.AcdemicFacultyValidation.createAcdemicFacultyValidationSchema), faculty_controller_1.AcademicFacultyControllers.createAcdemicFacultyController);
router.get('/', faculty_controller_1.AcademicFacultyControllers.getAllAcademicFacultyController);
router.get('/:id', faculty_controller_1.AcademicFacultyControllers.getSingleAcademicFacultyController);
router.patch('/:id', faculty_controller_1.AcademicFacultyControllers.updateAcademicFacultyController);
exports.AcademicFacultyRouter = router;
