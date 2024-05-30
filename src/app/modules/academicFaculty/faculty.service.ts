import { AcademicFacultyInterface } from "./faculty.interface";
import AcademicFacultyModel from "./faculty.model";


const createAcdemicFacultyDB = async (payload:AcademicFacultyInterface)=>{

const result = await AcademicFacultyModel.create(payload)

return result

}





export const AcademicFacultyServices = {
    createAcdemicFacultyDB
}