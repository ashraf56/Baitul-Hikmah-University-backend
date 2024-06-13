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
        ref: "AcademicFaculty"

    }
})


academicDepartmentSChema.pre('save', async function (next) {
    const isExsitdep = await AcademicDepartment.findOne(
        { name: this.name }
    )

    if (isExsitdep) {
        throw new Error('You can not add same department again')
    }
    next()

})

academicDepartmentSChema.pre('findOneAndUpdate', async function (next) {
    const quey = this.getQuery()

    const isDepartmentExist = await AcademicDepartment.findOne(quey)
    if (!isDepartmentExist) {
        throw new Error('this department is not exist')
    }
    next()
})

const AcademicDepartment = model<AcademicDepartmentInterface>('AcademicDepartment', academicDepartmentSChema)

export default AcademicDepartment