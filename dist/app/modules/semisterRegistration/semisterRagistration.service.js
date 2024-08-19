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
exports.semisterRagistrationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const ErrorApp_1 = __importDefault(require("../../errors/ErrorApp"));
const academicsemister_model_1 = require("../academicSemister/academicsemister.model");
const semisterRagistration_constants_1 = require("./semisterRagistration.constants");
const semisterRagistration_model_1 = require("./semisterRagistration.model");
const createSemesterRegistrationDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload.academicSemester;
    const isThereAnyUpcomingOrOngoingSEmester = yield semisterRagistration_model_1.SemesterRegistration.findOne({
        $or: [
            { status: semisterRagistration_constants_1.RegistrationStatus.UPCOMING },
            { status: semisterRagistration_constants_1.RegistrationStatus.ONGOING },
        ],
    });
    if (isThereAnyUpcomingOrOngoingSEmester) {
        throw new Error(`There is aready an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`);
    }
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
const getAllSemesterRegistrationsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semisterRagistration_model_1.SemesterRegistration.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield semesterRegistrationQuery.metaCount();
    const result = yield semesterRegistrationQuery.modelQuery;
    return {
        meta,
        result
    };
});
const getSinglesemesterRegistrationDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semisterRagistration_model_1.SemesterRegistration.findById(id);
    return result;
});
const SemesterRegistrationUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSemesterRegistrationExists = yield semisterRagistration_model_1.SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExists) {
        throw new ErrorApp_1.default(http_status_1.default.NOT_FOUND, 'This semester is not found !');
    }
    const currentSemesterStatus = isSemesterRegistrationExists === null || isSemesterRegistrationExists === void 0 ? void 0 : isSemesterRegistrationExists.status;
    const requestedStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    if (currentSemesterStatus === semisterRagistration_constants_1.RegistrationStatus.ENDED) {
        throw new ErrorApp_1.default(http_status_1.default.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`);
    }
    // UPCOMING --> ONGOING --> ENDED
    if (currentSemesterStatus === semisterRagistration_constants_1.RegistrationStatus.UPCOMING &&
        requestedStatus === semisterRagistration_constants_1.RegistrationStatus.ENDED) {
        throw new ErrorApp_1.default(http_status_1.default.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    if (currentSemesterStatus === semisterRagistration_constants_1.RegistrationStatus.ONGOING &&
        requestedStatus === semisterRagistration_constants_1.RegistrationStatus.UPCOMING) {
        throw new ErrorApp_1.default(http_status_1.default.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    const result = yield semisterRagistration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.semisterRagistrationService = {
    createSemesterRegistrationDB,
    getAllSemesterRegistrationsFromDB,
    SemesterRegistrationUpdate,
    getSinglesemesterRegistrationDB
};
