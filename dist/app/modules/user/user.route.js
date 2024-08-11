"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const student_Zod_1 = require("../student/student.Zod");
const faculty_validation_1 = require("../faculty/faculty.validation");
const admin_validation_1 = require("../admin/admin.validation");
const authvalidator_1 = __importDefault(require("../../middleware/authvalidator"));
const sendImageTOCloudinary_1 = require("../../utils/sendImageTOCloudinary");
const router = express_1.default.Router();
router.post('/create-student', (0, authvalidator_1.default)('superAdmin', 'admin'), sendImageTOCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(student_Zod_1.createStudentsInfoZODSchema), user_controller_1.UserController.createUsers);
router.post('/create-faculty', (0, authvalidator_1.default)('superAdmin', 'admin'), sendImageTOCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(faculty_validation_1.FacultyValidations.createFacultyValidationSchema), user_controller_1.UserController.createFaculty);
router.post('/create-admin', (0, authvalidator_1.default)('superAdmin'), sendImageTOCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(admin_validation_1.AdminValidations.createAdminValidationSchema), user_controller_1.UserController.createAdmin);
router.get('/me', (0, authvalidator_1.default)('superAdmin', 'student', 'faculty', 'admin'), user_controller_1.UserController.getMeCOntroller);
exports.UserRouter = router;
