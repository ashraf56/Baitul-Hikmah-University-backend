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
exports.AcademicSemesterControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const academic_service_1 = require("./academic.service");
const createAcademicSemesterController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const acamedicData = req.body;
    const result = yield academic_service_1.AcademicSemesterServices.createAcademicSemesterIntoDB(acamedicData);
    res.status(200).json({
        success: true,
        message: "AcademicSemester successfully created",
        data: result
    });
}));
const getAllAcademicSemesters = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_service_1.AcademicSemesterServices.getAllAcademicSemestersFromDB();
    res.status(200).json({
        success: true,
        message: "Academic semester is retrieved succesfully",
        data: result
    });
}));
const getSingleAcademicSemester = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const result = yield academic_service_1.AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
    res.status(200).json({
        success: true,
        message: "Academic semester is retrieved succesfully'",
        data: result
    });
}));
const updateAcademicSemester = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const result = yield academic_service_1.AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId, req.body);
    res.status(200).json({
        success: true,
        message: "Academic semester is retrieved succesfully'",
        data: result
    });
}));
exports.AcademicSemesterControllers = {
    createAcademicSemesterController,
    getAllAcademicSemesters, getSingleAcademicSemester,
    updateAcademicSemester
};
