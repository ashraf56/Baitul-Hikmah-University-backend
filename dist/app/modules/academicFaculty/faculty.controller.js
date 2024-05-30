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
exports.AcademicFacultyControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const faculty_service_1 = require("./faculty.service");
const createAcdemicFacultyController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield faculty_service_1.AcademicFacultyServices.createAcdemicFacultyDB(payload);
    res.status(200).json({
        success: true,
        message: "new faculty created",
        data: result
    });
}));
const getAllAcademicFacultyController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allfaculty = yield faculty_service_1.AcademicFacultyServices.getAllAcademicFacultyFromDB();
    res.status(200).json({
        success: true,
        message: "All faculty retrive successfully",
        data: allfaculty
    });
}));
const getSingleAcademicFacultyController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const singlefaculty = yield faculty_service_1.AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);
    res.status(200).json({
        success: true,
        message: "single faculty retrive successfully",
        data: singlefaculty
    });
}));
const updateAcademicFacultyController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { payload } = req.body;
    const updateddata = yield faculty_service_1.AcademicFacultyServices.updateAcademicFacultyIntoDB(id, payload);
    res.status(200).json({
        success: true,
        message: "Academic semester is retrieved succesfully'",
        data: updateddata
    });
}));
exports.AcademicFacultyControllers = {
    createAcdemicFacultyController,
    getAllAcademicFacultyController,
    getSingleAcademicFacultyController,
    updateAcademicFacultyController
};
