import { AcademicSemester } from "../academicSemister/academicsemister.model";
import { SemesterRegistrationInterface } from "./semisterRagistration.interface";
import { SemesterRegistration } from "./semisterRagistration.model";






const createSemesterRegistrationDB = async (payload:SemesterRegistrationInterface)=>{

const academicSemester = payload.academicSemester

const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester) 

if (!isAcademicSemesterExists) {
    throw new Error(
      'This academic semester not found !',
    );
  }
const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester})
if (isSemesterRegistrationExists) {
    throw new Error(
      'This semester is already registered!',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;

}


export const semisterRagistrationService = {
    createSemesterRegistrationDB
}