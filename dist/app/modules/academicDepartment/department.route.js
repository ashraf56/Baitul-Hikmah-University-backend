"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const department_validatin_1 = require("./department.validatin");
const department_controller_1 = require("./department.controller");
const authvalidator_1 = __importDefault(require("../../middleware/authvalidator"));
const router = (0, express_1.Router)();
router.post('/create-department', (0, authvalidator_1.default)('superAdmin', 'admin'), (0, validateRequest_1.default)(department_validatin_1.academicDepartmentValidation.createAcademicDepartmentValidationSchema), department_controller_1.academicDepartmentCOntrollers.createAcademicDepartmentController);
router.get('/', (0, authvalidator_1.default)('superAdmin', 'admin'), department_controller_1.academicDepartmentCOntrollers.getAllAcademicDepartmentController);
router.get('/:id', (0, authvalidator_1.default)('superAdmin', 'admin'), department_controller_1.academicDepartmentCOntrollers.getSingleAcademicDepartmentController);
router.patch('/:id', (0, authvalidator_1.default)('superAdmin', 'admin'), (0, validateRequest_1.default)(department_validatin_1.academicDepartmentValidation.updateAcademicDepartmentValidationSchema), department_controller_1.academicDepartmentCOntrollers.updateAcademicDeartmentController);
exports.AcademicDepartmentRouter = router;
