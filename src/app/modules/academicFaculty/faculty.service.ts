import { AcademicFacultyInterface } from "./faculty.interface";
import AcademicFacultyModel from "./faculty.model";


const createAcdemicFacultyDB = async (payload: AcademicFacultyInterface) => {

    const result = await AcademicFacultyModel.create(payload)

    return result

}

const getAllAcademicFacultyFromDB = async () => {
    const res = await AcademicFacultyModel.find()
    return res;
}


const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFacultyModel.findById(id)
    return result

}

const updateAcademicFacultyIntoDB = async (id: string, payload: Partial<AcademicFacultyInterface>) => {

    const result = await AcademicFacultyModel.findByIdAndUpdate({ _id: id }, payload, { new: true })
    return result

}


export const AcademicFacultyServices = {
    createAcdemicFacultyDB, getAllAcademicFacultyFromDB, getSingleAcademicFacultyFromDB
    , updateAcademicFacultyIntoDB
}