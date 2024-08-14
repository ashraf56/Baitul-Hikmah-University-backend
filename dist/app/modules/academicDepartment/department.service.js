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
exports.academicDepartmentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ErrorApp_1 = __importDefault(require("../../errors/ErrorApp"));
const department_model_1 = __importDefault(require("./department.model"));
const createAcademicDepartmentintoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existDep = yield department_model_1.default.findOne({ name: payload.name });
    if (existDep) {
        throw new ErrorApp_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Department aready exist');
    }
    const insertDep = yield department_model_1.default.create(payload);
    return insertDep;
});
const getAllAcademicDepartmentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield department_model_1.default.find().populate('academicFaculty');
    return result;
});
const getSingleAcademicDepartmentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield department_model_1.default.findById(id);
    return result;
});
const updateAcademicDepartmentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield department_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.academicDepartmentService = {
    createAcademicDepartmentintoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB, updateAcademicDepartmentIntoDB
};
