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


academicDepartmentSChema.pre('save', async function (next) {
    const isExsitdep = await academicDepartmentModel.findOne(
        { name: this.name }
    )

    if (isExsitdep) {
        throw new Error('You can not add same department again')
    }
    next()

})

const academicDepartmentModel = model<AcademicDepartmentInterface>('AcademicDepartment', academicDepartmentSChema)

export default academicDepartmentModel