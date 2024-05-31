import { AcademicDepartmentInterface } from "./department.interface";
import academicDepartmentModel from "./department.model";

const createAcademicDepartmentintoDB = async (payload: AcademicDepartmentInterface) => {

    const insertDep = await academicDepartmentModel.create(payload)
    return insertDep

}

const getAllAcademicDepartmentsFromDB = async () => {
    const result = await academicDepartmentModel.find();
    return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await academicDepartmentModel.findById(id)
    return result;
};



const updateAcademicDepartmentIntoDB = async (
    id: string,
    payload: Partial<AcademicDepartmentInterface>,
) => {
    const result = await academicDepartmentModel.findOneAndUpdate(
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
    getSingleAcademicDepartmentFromDB,updateAcademicDepartmentIntoDB
}