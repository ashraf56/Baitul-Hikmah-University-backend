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
exports.StudentService = void 0;
const mongoose_1 = require("mongoose");
const student_schema_1 = __importDefault(require("./student.schema"));
const user_model_1 = __importDefault(require("../user/user.model"));
const student_constant_1 = require("./student.constant");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const getStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const queryObject = { ...query }
    // let searchinfo = ''
    // if (query?.searchinfo) {
    //     searchinfo = query?.searchinfo as string
    // }
    // // searchQuery
    // const searchablefeild = ['email', 'name']
    // const searchQuery = Student.find({
    //     $or: searchablefeild.map((feild) => ({
    //         [feild]: { $regex: searchinfo, $options: 'i' }
    //     }))
    // })
    // const removeFeildfromQuery = ['searchinfo', 'sort', 'limit', 'page', 'skip', 'fields']
    // removeFeildfromQuery.forEach((el) => delete queryObject[el])
    // const filterQuery = searchQuery.find(queryObject).populate('admissionSemester')
    // let sort = '-createdAt'
    // if (query.sort) {
    //     sort = query.sort as string
    // }
    // const sortQuery = filterQuery.sort(sort)
    // // PAGINATION FUNCTIONALITY:
    // let limit = 3;
    // let page = 1;
    // let skip = 0
    // if (query.limit) {
    //     limit = query.limit as number;
    // }
    // if (query.page) {
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // }
    // const paginateQuery = sortQuery.skip(skip);
    // const limitQuery = paginateQuery.limit(limit);
    // // FIELDS LIMITING FUNCTIONALITY:
    // let fields = '-__v'
    // if (query.fields) {
    //     fields = (query.fields as string).split(',').join(' ');
    // }
    // const fieldQuery = await limitQuery.select(fields);
    // return fieldQuery;
    const studentQuery = new QueryBuilder_1.default(student_schema_1.default.find(), query)
        .search(student_constant_1.searchablefeild)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield studentQuery.modelQuery;
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const deletstudent = yield student_schema_1.default.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletstudent) {
            throw new Error('Delete transition is faild');
        }
        const deletuser = yield user_model_1.default.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletuser) {
            throw new Error('Delete transition is faild');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletstudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to delete student');
    }
});
const updatestudentDataintoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // see modeule 13.12 video
});
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_schema_1.default.findById(id).populate('admissionSemester');
    return result;
});
exports.StudentService = {
    getStudentsFromDB, deleteStudentFromDB, updatestudentDataintoDB, getSingleStudentFromDB
};
