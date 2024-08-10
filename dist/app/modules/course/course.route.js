"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const authvalidator_1 = __importDefault(require("../../middleware/authvalidator"));
const router = (0, express_1.Router)();
router.post('/create-course', (0, authvalidator_1.default)('admin', 'superAdmin'), (0, validateRequest_1.default)(course_validation_1.CourseValidations.createCourseValidationSchema), course_controller_1.CourseControllers.createCourseController);
router.get('/:id', (0, authvalidator_1.default)('admin', 'superAdmin', 'student', 'faculty'), course_controller_1.CourseControllers.getSingleCourseController);
router.delete('/:id', (0, authvalidator_1.default)('admin', 'superAdmin'), course_controller_1.CourseControllers.deleteCourseController);
router.get('/', (0, authvalidator_1.default)('admin', 'superAdmin', 'student', 'faculty'), course_controller_1.CourseControllers.getAllCourseController);
router.patch('/:id', (0, authvalidator_1.default)('admin', 'superAdmin'), (0, validateRequest_1.default)(course_validation_1.CourseValidations.updateCourseValidationSchema), course_controller_1.CourseControllers.getUpdateCourseController);
// Course Faculty route
router.delete('/:courseID/remove-course', (0, authvalidator_1.default)('superAdmin', 'admin'), (0, validateRequest_1.default)(course_validation_1.CourseValidations.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.RemoveCourseFacultyController);
router.put('/:courseID/assign-course', (0, authvalidator_1.default)('superAdmin', 'admin'), (0, validateRequest_1.default)(course_validation_1.CourseValidations.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.AssignCourseFacultyController);
router.get('/:courseId/get-course-faculty', (0, authvalidator_1.default)('superAdmin', 'admin'), course_controller_1.CourseControllers.getFacultiesWithCourseController);
exports.CourseRouter = router;
