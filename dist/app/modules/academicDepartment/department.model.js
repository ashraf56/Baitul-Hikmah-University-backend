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
const mongoose_1 = require("mongoose");
const academicDepartmentSChema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicFacultyModel"
    }
});
academicDepartmentSChema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExsitdep = yield academicDepartmentModel.findOne({ name: this.name });
        if (isExsitdep) {
            throw new Error('You can not add same department again');
        }
        next();
    });
});
academicDepartmentSChema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const quey = this.getQuery();
        const isDepartmentExist = yield academicDepartmentModel.findOne(quey);
        if (!isDepartmentExist) {
            throw new Error('this department is not exist');
        }
        next();
    });
});
const academicDepartmentModel = (0, mongoose_1.model)('AcademicDepartment', academicDepartmentSChema);
exports.default = academicDepartmentModel;
