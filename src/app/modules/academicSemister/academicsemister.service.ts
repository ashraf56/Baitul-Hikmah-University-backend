import QueryBuilder from "../../builder/QueryBuilder";
import { academicSemesterNameCodeMapper, AcademicSemesterSearchableFields } from "./academicsemister.constant";
import { TAcademicSemester } from "./academicsemister.interface";
import { AcademicSemester } from "./academicsemister.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    // semister name is not equal to its code then --->
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemester.create(payload);
    return result;
};



const getAllAcademicSemestersFromDB = async (query: Record<string, unknown>) => {

    const AcademicSemisterQuery = new QueryBuilder(AcademicSemester.find(),query).search(AcademicSemesterSearchableFields).filter().sort().paginate().fields()
    const result = await AcademicSemisterQuery.modelQuery
    return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
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

    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};



export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB, getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}