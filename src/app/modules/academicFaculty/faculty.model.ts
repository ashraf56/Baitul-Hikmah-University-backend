import { Schema, model } from "mongoose";
import { AcademicFacultyInterface } from "./faculty.interface";

const AcademicFacultySchema = new Schema<AcademicFacultyInterface>({

    name: {
        type: String, required: true
    }


})



const AcademicFaculty = model<AcademicFacultyInterface>('AcademicFaculty', AcademicFacultySchema)

export default AcademicFaculty