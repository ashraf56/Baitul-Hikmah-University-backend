import { Schema, model } from "mongoose";
import { AcademicDepartmentInterface } from "./department.interface";


const academicDepartmentSChema = new Schema<AcademicDepartmentInterface>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: "AcademicFacultyModel"

    }
})




const academicDepartmentModel = model<AcademicDepartmentInterface>('AcademicDepartment', academicDepartmentSChema)

export default academicDepartmentModel