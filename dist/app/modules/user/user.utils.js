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
exports.genarateSudentID = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const findLaststudentID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.default.findOne({
        role: 'student'
    }, {
        id: 1,
        _id: 0
    })
        .sort({
        createdAt: -1
    });
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id : undefined;
});
const genarateSudentID = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentID = (0).toString(); // 0000
    const lastStudentID = yield findLaststudentID(); // 2030 01 0001
    const lastsemistercode = lastStudentID === null || lastStudentID === void 0 ? void 0 : lastStudentID.substring(4, 6); // 01
    const lastsemisterYear = lastStudentID === null || lastStudentID === void 0 ? void 0 : lastStudentID.substring(0, 4); //2030
    const currentYear = payload.year;
    const currentcode = payload.code;
    if (lastStudentID && lastsemisterYear === currentYear && lastsemistercode === currentcode) {
        currentID = lastStudentID === null || lastStudentID === void 0 ? void 0 : lastStudentID.substring(6); // 0001
    }
    let incrementedID = (Number(currentID) + 1).toString().padStart(4, '0');
    incrementedID = `${payload.year}${payload.code}${incrementedID}`;
    return incrementedID;
});
exports.genarateSudentID = genarateSudentID;
