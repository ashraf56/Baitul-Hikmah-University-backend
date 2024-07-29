"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = require("../../utils/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const createUsers = (0, catchAsync_1.catchasync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student } = req.body;
    const newusers = yield user_service_1.UserService.CreateUserDB(password, student);
    res.status(200).json({
        success: true,
        message: "success",
        data: newusers
    });
}));
const createFaculty = (0, catchAsync_1.catchasync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty } = req.body;
    const newfaculty = yield user_service_1.UserService.CreateFacultyDB(password, faculty);
    res.status(200).json({
        success: true,
        message: "success",
        data: newfaculty
    });
}));
const createAdmin = (0, catchAsync_1.catchasync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin } = req.body;
    const newAdmin = yield user_service_1.UserService.createAdminIntoDB(password, admin);
    res.status(200).json({
        success: true,
        message: "success",
        data: newAdmin
    });
}));
const getMeCOntroller = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const result = yield user_service_1.UserService.getMe(id, role);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "success",
        data: result
    });
}));
exports.UserController = {
    createUsers, createFaculty, createAdmin, getMeCOntroller
};
