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
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.default)(student_Zod_1.createStudentsInfoZODSchema), user_controller_1.UserController.createUsers);
exports.UserRouter = router;
