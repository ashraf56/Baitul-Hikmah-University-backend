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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const OfferedCourse_service_1 = require("./OfferedCourse.service");
const createOfferedCourseController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield OfferedCourse_service_1.OfferedCourseServices.createOfferedCourseIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Offered Courses is created succesfully',
        data: result,
    });
}));
exports.OfferedCourseController = {
    createOfferedCourseController
};
