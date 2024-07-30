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
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const academicsemister_model_1 = require("../academicSemister/academicsemister.model");
const student_schema_1 = __importDefault(require("../student/student.schema"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = require("./user.utils");
const department_model_1 = __importDefault(require("../academicDepartment/department.model"));
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
const sendImageTOCloudinary_1 = require("../../utils/sendImageTOCloudinary");
const CreateUserDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserdata = {};
    newUserdata.password = password || 'abc123';
    newUserdata.role = 'student';
    newUserdata.email = payload.email;
    const admissionSemester = yield academicsemister_model_1.AcademicSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new Error('Admission semester not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        newUserdata.id = yield (0, user_utils_1.genarateSudentID)(admissionSemester);
        (0, sendImageTOCloudinary_1.sendImageTOcloudinary)();
        // it will create new user in the user colleciton
        const newUser = yield user_model_1.default.create([newUserdata], { session });
        if (!newUser.length) {
            throw new Error('Failed to create user');
        }
        payload.id = newUser[0].id;
        payload.userid = newUser[0]._id;
        // it will create student in the strudents collection
        const students = yield student_schema_1.default.create([payload], { session });
        if (!students.length) {
            throw new Error('Failed to create student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return students;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to complete transition');
    }
});
const CreateFacultyDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserdata = {};
    newUserdata.password = password || 'abc123';
    newUserdata.role = 'faculty';
    newUserdata.email = payload.email;
    const academicdepartment = yield department_model_1.default.findById(payload.academicdepartment);
    if (!academicdepartment) {
        throw new Error('academic Department  not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        newUserdata.id = yield (0, user_utils_1.generateFacultyId)();
        // it will create new user in the user colleciton
        const newUser = yield user_model_1.default.create([newUserdata], { session });
        if (!newUser.length) {
            throw new Error('Failed to create user');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // it will create student in the strudents collection
        const faculties = yield faculty_model_1.Faculty.create([payload], { session });
        if (!faculties.length) {
            throw new Error('Failed to create student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return faculties;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to complete transition');
    }
});
const createAdminIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || 'abc123';
    //set admin role
    userData.role = 'admin';
    //set admin email
    userData.email = payload.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateAdminId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.default.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new Error('Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new Error('Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getMe = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === 'student') {
        result = yield student_schema_1.default.findOne({ id: id }).populate('user');
    }
    if (role === 'admin') {
        result = yield admin_model_1.Admin.findOne({ id: id }).populate('user');
    }
    if (role === 'faculty') {
        result = yield faculty_model_1.Faculty.findOne({ id: id }).populate('user');
    }
    return result;
});
exports.UserService = {
    CreateUserDB, CreateFacultyDB, createAdminIntoDB, getMe
};
