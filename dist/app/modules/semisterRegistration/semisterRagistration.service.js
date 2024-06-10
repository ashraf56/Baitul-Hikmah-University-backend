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
exports.semisterRagistrationService = void 0;
const academicsemister_model_1 = require("../academicSemister/academicsemister.model");
const semisterRagistration_model_1 = require("./semisterRagistration.model");
const createSemesterRegistrationDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload.academicSemester;
    const isAcademicSemesterExists = yield academicsemister_model_1.AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new Error('This academic semester not found !');
    }
    const isSemesterRegistrationExists = yield semisterRagistration_model_1.SemesterRegistration.findOne({ academicSemester });
    if (isSemesterRegistrationExists) {
        throw new Error('This semester is already registered!');
    }
    const result = yield semisterRagistration_model_1.SemesterRegistration.create(payload);
    return result;
});
exports.semisterRagistrationService = {
    createSemesterRegistrationDB
};
