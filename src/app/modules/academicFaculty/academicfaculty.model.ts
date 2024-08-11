import { Schema, model } from "mongoose";
import { AcademicFacultyInterface } from "./academicfaculty.interface";

const AcademicFacultySchema = new Schema<AcademicFacultyInterface>({

    name: {
        type: String, required: true
    }


}, {
    timestamps: true
})



const AcademicFaculty = model<AcademicFacultyInterface>('AcademicFaculty', AcademicFacultySchema)

export default AcademicFaculty