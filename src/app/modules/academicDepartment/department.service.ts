import { AcademicDepartmentInterface } from "./department.interface";
import academicDepartmentModel from "./department.model";

const createAcademicDepartmentintoDB = async (payload: AcademicDepartmentInterface) => {

    const insertDep = await academicDepartmentModel.create(payload)
    return insertDep

}



export const academicDepartmentService = {
    createAcademicDepartmentintoDB
}