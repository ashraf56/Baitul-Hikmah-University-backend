"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRouter = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const authvalidator_1 = __importDefault(require("../../middleware/authvalidator"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/:id', faculty_controller_1.FacultyControllers.getSingleFaculty);
router.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.FacultyValidations.updateFacultyValidationSchema), faculty_controller_1.FacultyControllers.updateFaculty);
router.delete('/:id', faculty_controller_1.FacultyControllers.deleteFaculty);
router.get('/', (0, authvalidator_1.default)(user_constant_1.UserRoles.admin, user_constant_1.UserRoles.faculty), faculty_controller_1.FacultyControllers.getAllFaculties);
exports.FacultyRouter = router;
