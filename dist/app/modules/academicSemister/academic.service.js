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
exports.AcademicSemesterServices = void 0;
const academic_constant_1 = require("./academic.constant");
const academic_model_1 = require("./academic.model");
const createAcademicSemesterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // semister name is not equal to its code then --->
    if (academic_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }
    const result = yield academic_model_1.AcademicSemesterModel.create(payload);
    return result;
});
const getAllAcademicSemestersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_model_1.AcademicSemesterModel.find();
    return result;
});
const getSingleAcademicSemesterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academic_model_1.AcademicSemesterModel.findById(id);
    return result;
});
const updateAcademicSemesterIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name &&
        payload.code &&
        academic_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }
    const result = yield academic_model_1.AcademicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB, getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
};
