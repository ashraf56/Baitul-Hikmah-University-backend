"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academic_validaton_1 = require("./academic.validaton");
const academic_controller_1 = require("./academic.controller");
const router = (0, express_1.Router)();
router.post('/create-semister', (0, validateRequest_1.default)(academic_validaton_1.AcademicSemesterValidation.createAcdemicSemesterValidationSchema), academic_controller_1.AcademicSemesterControllers.createAcademicSemesterController);
router.get('/:semesterId', academic_controller_1.AcademicSemesterControllers.getSingleAcademicSemester);
router.patch('/:semesterId', (0, validateRequest_1.default)(academic_validaton_1.AcademicSemesterValidation.updateAcademicSemesterValidationSchema), academic_controller_1.AcademicSemesterControllers.updateAcademicSemester);
router.get('/', academic_controller_1.AcademicSemesterControllers.getAllAcademicSemesters);
exports.AcademicSemesterRouter = router;
