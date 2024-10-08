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
exports.EnrollCoureseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const enrollCourese_service_1 = require("./enrollCourese.service");
const createEnrolledCourseController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const result = yield enrollCourese_service_1.EnrollCoureseService.createEnrolledCourseIntoDB(id, req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Student is enrolled succesfully',
        data: result,
    });
}));
const updateEnrolledCourseMarks = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrollCourese_service_1.EnrollCoureseService.updateEnrolledCourseMarksIntoDB(req.user.id, req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Marks is updated succesfully',
        data: result,
    });
}));
exports.EnrollCoureseController = {
    createEnrolledCourseController,
    updateEnrolledCourseMarks
};
