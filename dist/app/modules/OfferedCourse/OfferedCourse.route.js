"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const OfferedCourse_validation_1 = require("./OfferedCourse.validation");
const OfferedCourse_controller_1 = require("./OfferedCourse.controller");
const authvalidator_1 = __importDefault(require("../../middleware/authvalidator"));
const router = (0, express_1.Router)();
router.post('/create-offered-course', (0, authvalidator_1.default)('admin', "superAdmin"), (0, validateRequest_1.default)(OfferedCourse_validation_1.OfferedCourseValidations.createOfferedCoursevalidation), OfferedCourse_controller_1.OfferedCourseController.createOfferedCourseController);
exports.OfferedCourseRoute = router;
