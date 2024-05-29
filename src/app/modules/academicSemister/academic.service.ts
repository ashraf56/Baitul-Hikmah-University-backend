import { academicSemesterNameCodeMapper } from "./academic.constant";
import { TAcademicSemester } from "./academic.interface";
import { AcademicSemesterModel } from "./academic.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    // semister name is not equal to its code then --->
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
      }
  
    const result = await AcademicSemesterModel.create(payload);
    return result;
  };



  export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
  }