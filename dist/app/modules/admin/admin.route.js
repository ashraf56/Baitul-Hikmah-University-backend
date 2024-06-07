"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const router = (0, express_1.Router)();
router.get('/', admin_controller_1.AdminControllers.getAllAdminsController);
router.get('/:id', admin_controller_1.AdminControllers.getSingleAdminController);
router.patch('/:id', (0, validateRequest_1.default)(admin_validation_1.AdminValidations.updateAdminValidationSchema), admin_controller_1.AdminControllers.updateAdminController);
router.delete('/:id', admin_controller_1.AdminControllers.deleteAdminController);
exports.AddminRouter = router;
