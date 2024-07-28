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
exports.AcademicSemesterServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicsemister_constant_1 = require("./academicsemister.constant");
const academicsemister_model_1 = require("./academicsemister.model");
const createAcademicSemesterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // semister name is not equal to its code then --->
    if (academicsemister_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }
    const result = yield academicsemister_model_1.AcademicSemester.create(payload);
    return result;
});
const getAllAcademicSemestersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const AcademicSemisterQuery = new QueryBuilder_1.default(academicsemister_model_1.AcademicSemester.find(), query).search(academicsemister_constant_1.AcademicSemesterSearchableFields).filter().sort().paginate().fields();
    const result = yield AcademicSemisterQuery.modelQuery;
    return result;
});
const getSingleAcademicSemesterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicsemister_model_1.AcademicSemester.findById(id);
    return result;
});
const updateAcademicSemesterIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name &&
        payload.code &&
        academicsemister_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }
    const result = yield academicsemister_model_1.AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB, getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
};
