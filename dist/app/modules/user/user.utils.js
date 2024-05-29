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
    // byDefault currentID will be 0  
    let currentID = (0).toString(); // 0000
    // here is checking point for last student id. first time it's value will be undefined, when no student created. 
    const lastStudentID = yield findLaststudentID(); // 2030 01 0001
    /* here is destructuring last semister code and year from lastStudentID.eg:
     if no student exist
     const lastsemistercode = undefined
     const lastsemisterYear = undefined
     if student exist then
     const lastsemistercode = 03
     const lastsemisterYear = 2032 */
    const lastsemistercode = lastStudentID === null || lastStudentID === void 0 ? void 0 : lastStudentID.substring(4, 6); // 01
    const lastsemisterYear = lastStudentID === null || lastStudentID === void 0 ? void 0 : lastStudentID.substring(0, 4); //2030
    // current YEar and code
    const currentYear = payload.year;
    const currentcode = payload.code;
    /*
    It's will check the  last Year and code with current Year and Code. if the condition returns true
   then it returns currentID =  0001
  
   if no stududent exist then the conditon will  return fasle.
   if ( undefined && undefined === 2032 && undefined ===03 ) {  currentID = 0  }
    
    let incrementedID = (Number(0) + 1).toString().padStart(4, '0')
    incrementedID = `${2032}${03}${1}`
    incrementedID will be 1
    the id will be 2032030001
      
  after second time
  
   if ( 203203001 && 2032 === 2032 && 03 ===03 ) {  currentID = 1  }

       let incrementedID = (Number(1) + 1).toString().padStart(4, '0') // 2
  
       incrementedID will be 2
      incrementedID = `${2032}${03}${2}`
      the id will be 2032030002
  
      */
    if (lastStudentID && lastsemisterYear === currentYear && lastsemistercode === currentcode) {
        currentID = lastStudentID === null || lastStudentID === void 0 ? void 0 : lastStudentID.substring(6); // 0001
    }
    let incrementedID = (Number(currentID) + 1).toString().padStart(4, '0');
    incrementedID = `${payload.year}${payload.code}${incrementedID}`;
    return incrementedID;
});
exports.genarateSudentID = genarateSudentID;
