"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollCourseRoutes = void 0;
const express_1 = require("express");
const enrollCourese_controller_1 = require("./enrollCourese.controller");
const enrollCourese_validation_1 = require("./enrollCourese.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const authvalidator_1 = __importDefault(require("../../middleware/authvalidator"));
const router = (0, express_1.Router)();
router.post('/create-enroll-course', (0, authvalidator_1.default)('student'), (0, validateRequest_1.default)(enrollCourese_validation_1.EnrolledCourseValidations.createEnrolledCourseValidationZodSchema), enrollCourese_controller_1.EnrollCoureseController.createEnrolledCourseController);
router.patch('/update-enrolled-course-marks', (0, authvalidator_1.default)('faculty'), (0, validateRequest_1.default)(enrollCourese_validation_1.EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema), enrollCourese_controller_1.EnrollCoureseController.updateEnrolledCourseMarks);
exports.EnrollCourseRoutes = router;
