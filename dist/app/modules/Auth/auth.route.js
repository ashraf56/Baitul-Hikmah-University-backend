"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authroutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const authvalidator_1 = __importDefault(require("../../middleware/authvalidator"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.Authvalidations.loginValidationSchema), auth_controller_1.AuthController.LoginUserController);
router.post('/change-pass', (0, authvalidator_1.default)(user_constant_1.UserRoles.admin, user_constant_1.UserRoles.faculty, user_constant_1.UserRoles.student), (0, validateRequest_1.default)(auth_validation_1.Authvalidations.changePassValidationSchema), auth_controller_1.AuthController.ChangepassController);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.Authvalidations.RefreshTokenvalidation), auth_controller_1.AuthController.RefreshTokenController);
exports.Authroutes = router;
