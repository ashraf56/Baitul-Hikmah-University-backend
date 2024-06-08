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
exports.CourseServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_contant_1 = require("./course.contant");
const course_model_1 = __importDefault(require("./course.model"));
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const reslt = yield course_model_1.default.create(payload);
    return reslt;
});
const getAllCourseFromdb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.default.find(), query).search(course_contant_1.CourseSearchableFields)
        .filter().sort().paginate().fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.findById(id).populate('preRequisiteCourses.course');
    return result;
});
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
exports.CourseServices = {
    createCourseIntoDB,
    getAllCourseFromdb,
    getSingleCourseFromDB,
    deleteCourseFromDB
};
