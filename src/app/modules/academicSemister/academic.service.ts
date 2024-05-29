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



const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemesterModel.find();
    return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemesterModel.findById(id);
    return result;
};

const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
) => {
    if (
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};



export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB, getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}