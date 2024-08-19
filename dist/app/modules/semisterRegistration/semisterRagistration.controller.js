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
exports.SemesterRegistrationController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
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
const updateSemisterRegitrationController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semisterRagistration_service_1.semisterRagistrationService.SemesterRegistrationUpdate(id, req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Semester Registration is Updated successfully !',
        data: result,
    });
}));
const getAllSemesterRegistrationsController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semisterRagistration_service_1.semisterRagistrationService.getAllSemesterRegistrationsFromDB(req.query);
    res.status(200).json({
        success: true,
        message: 'Semester Registration is retrieved successfully !',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleSemesterRegistrationsController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semisterRagistration_service_1.semisterRagistrationService.getSinglesemesterRegistrationDB(id);
    res.status(200).json({
        success: true,
        message: 'single Semester Registration is retrieved successfully !',
        data: result,
    });
}));
exports.SemesterRegistrationController = {
    createSemesterRegistrationController,
    getAllSemesterRegistrationsController,
    updateSemisterRegitrationController,
    getSingleSemesterRegistrationsController
};
