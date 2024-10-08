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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_contant_1 = require("./course.contant");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const reslt = yield course_model_1.Course.create(payload);
    return reslt;
});
const getAllCourseFromdb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate('preRequisiteCourses.course'), query).search(course_contant_1.CourseSearchableFields)
        .filter().sort().paginate().fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
    return result;
});
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
const updateCourseintoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = payload, remaingCOurse = __rest(payload, ["preRequisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateCourseinfo = yield course_model_1.Course.findByIdAndUpdate(id, remaingCOurse, { new: true, runValidators: true, session });
        if (!updateCourseinfo) {
            throw new Error("Failed to update course!");
        }
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // it will return truthy value of isDeleted feild
            const deletedPreCourse = preRequisiteCourses.filter((el) => el.course && el.isDeleted)
                .map(el => el.course);
            const deletedPreCourseresult = yield course_model_1.Course.findByIdAndUpdate(id, {
                $pull: { preRequisiteCourses: { course: { $in: deletedPreCourse } } }
            }, {
                new: true,
                runValidators: true, session
            });
            if (!deletedPreCourseresult) {
                throw new Error('Failed to update course!');
            }
            const newPreCourse = preRequisiteCourses.filter((el) => el.course && !el.isDeleted);
            const newPreCourseresult = yield course_model_1.Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newPreCourse } }
            }, {
                new: true,
                runValidators: true,
                session
            });
            if (!newPreCourseresult) {
                throw new Error('Failed to update course!');
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to update course!');
    }
});
const AssignCourseFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const reslt = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } }
    }, {
        upsert: true,
        new: true
    });
    return reslt;
});
const removeCourseFacultyDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const reslt = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } }
    }, {
        new: true
    });
    return reslt;
});
const getFacultiesWithCourseFromDB = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findOne({ course: courseId }).populate('faculties');
    return result;
});
exports.CourseServices = {
    createCourseIntoDB,
    getAllCourseFromdb,
    getSingleCourseFromDB,
    updateCourseintoDB,
    deleteCourseFromDB,
    AssignCourseFaculty,
    removeCourseFacultyDB,
    getFacultiesWithCourseFromDB
};
