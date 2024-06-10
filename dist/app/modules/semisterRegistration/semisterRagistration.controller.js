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
exports.SemesterRegistrationController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const semisterRagistration_service_1 = require("./semisterRagistration.service");
const createSemesterRegistrationController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield semisterRagistration_service_1.semisterRagistrationService.createSemesterRegistrationDB(payload);
    res.status(200).json({
        success: true,
        message: 'Semester Registration success',
        data: result,
    });
}));
exports.SemesterRegistrationController = {
    createSemesterRegistrationController
};
