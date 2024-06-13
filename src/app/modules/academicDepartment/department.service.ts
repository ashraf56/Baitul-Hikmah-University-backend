import { AcademicDepartmentInterface } from "./department.interface";
import AcademicDepartment from "./department.model";

const createAcademicDepartmentintoDB = async (payload: AcademicDepartmentInterface) => {

    const insertDep = await AcademicDepartment.create(payload)
    return insertDep

}

const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find().populate('academicFaculty');

    return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartment.findById(id)
    return result;
};



const updateAcademicDepartmentIntoDB = async (
    id: string,
    payload: Partial<AcademicDepartmentInterface>,
) => {
    const result = await AcademicDepartment.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );
    return result;
};

export const academicDepartmentService = {
    createAcademicDepartmentintoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB, updateAcademicDepartmentIntoDB
}