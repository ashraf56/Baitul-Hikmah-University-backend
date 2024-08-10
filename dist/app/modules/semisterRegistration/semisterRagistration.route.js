"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemisterRagistrationroute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const semisterRagistration_validation_1 = require("./semisterRagistration.validation");
const semisterRagistration_controller_1 = require("./semisterRagistration.controller");
const authvalidator_1 = __importDefault(require("../../middleware/authvalidator"));
const router = express_1.default.Router();
router.post('/create-semester-registration', (0, authvalidator_1.default)('superAdmin', 'admin'), (0, validateRequest_1.default)(semisterRagistration_validation_1.semisterRagistrationValidation.createSemesterRegistrationValidationSchema), semisterRagistration_controller_1.SemesterRegistrationController.createSemesterRegistrationController);
router.get('/', (0, authvalidator_1.default)('superAdmin', 'admin', 'faculty', 'student'), semisterRagistration_controller_1.SemesterRegistrationController.getAllSemesterRegistrationsController);
exports.SemisterRagistrationroute = router;
