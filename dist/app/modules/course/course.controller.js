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
exports.CourseControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const course_service_1 = require("./course.service");
const createCourseController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const coursedata = yield course_service_1.CourseServices.createCourseIntoDB(payload);
    res.status(200).json({
        success: true,
        message: "new course created",
        data: coursedata
    });
}));
const getAllCourseController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.getAllCourseFromdb(req.query);
    res.status(200).json({
        success: true,
        message: "Courses are retrieved successfully",
        data: result
    });
}));
const getSingleCourseController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.getSingleCourseFromDB(id);
    res.status(200).json({
        success: true,
        message: "Course is retrieved successfully",
        data: result
    });
}));
const deleteCourseController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.deleteCourseFromDB(id);
    res.status(200).json({
        success: true,
        message: "Course is Deleted successfully",
        data: result
    });
}));
const getUpdateCourseController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield course_service_1.CourseServices.updateCourseintoDB(id, payload);
    res.status(200).json({
        success: true,
        message: "Course is Updated successfully",
        data: result
    });
}));
const AssignCourseFacultyController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseID } = req.params;
    const { faculties } = req.body;
    const assignRes = yield course_service_1.CourseServices.AssignCourseFaculty(courseID, faculties);
    res.status(200).json({
        success: true,
        message: "Assign faculty into Course is successfully done",
        data: assignRes
    });
}));
const RemoveCourseFacultyController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseID } = req.params;
    const { faculties } = req.body;
    const assignRes = yield course_service_1.CourseServices.removeCourseFacultyDB(courseID, faculties);
    res.status(200).json({
        success: true,
        message: "Remove faculty from Course  is successfully done",
        data: assignRes
    });
}));
const getFacultiesWithCourseController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_service_1.CourseServices.getFacultiesWithCourseFromDB(courseId);
    res.status(200).json({
        success: true,
        message: "Faculties retrieved succesfully",
        data: result
    });
}));
exports.CourseControllers = {
    createCourseController,
    getAllCourseController,
    getSingleCourseController,
    deleteCourseController,
    getUpdateCourseController,
    AssignCourseFacultyController,
    RemoveCourseFacultyController,
    getFacultiesWithCourseController
};
