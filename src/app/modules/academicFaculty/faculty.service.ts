import { AcademicFacultyInterface } from "./faculty.interface";
import AcademicFaculty from "./faculty.model";


const createAcdemicFacultyDB = async (payload: AcademicFacultyInterface) => {

    const result = await AcademicFaculty.create(payload)

    return result

}

const getAllAcademicFacultyFromDB = async () => {
    const res = await AcademicFaculty.find()
    return res;
}


const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id)
    return result

}

const updateAcademicFacultyIntoDB = async (id: string, payload: Partial<AcademicFacultyInterface>) => {

    const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, { new: true })
    return result

}


export const AcademicFacultyServices = {
    createAcdemicFacultyDB, getAllAcademicFacultyFromDB, getSingleAcademicFacultyFromDB
    , updateAcademicFacultyIntoDB
}