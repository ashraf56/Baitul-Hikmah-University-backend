"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoute = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const authvalidator_1 = __importDefault(require("../../middleware/authvalidator"));
const router = express_1.default.Router();
router.get('/', student_controller_1.StudentController.getAllstudent);
router.get('/:id', (0, authvalidator_1.default)('admin', 'faculty'), student_controller_1.StudentController.getSingleStudentController);
router.delete('/:id', student_controller_1.StudentController.deletStudentController);
exports.StudentRoute = router;
