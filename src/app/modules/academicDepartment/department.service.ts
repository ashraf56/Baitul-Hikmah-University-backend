import httpStatus from "http-status";
import ErrorApp from "../../errors/ErrorApp";
import { AcademicDepartmentInterface } from "./department.interface";
import AcademicDepartment from "./department.model";

const createAcademicDepartmentintoDB = async (payload: AcademicDepartmentInterface) => {

    const existDep = await AcademicDepartment.findOne({ name: payload.name })

    if (existDep) {
        throw new ErrorApp(httpStatus.INTERNAL_SERVER_ERROR, 'Department aready exist')
    }
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