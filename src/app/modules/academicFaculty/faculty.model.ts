import { Schema, model } from "mongoose";
import { AcademicFacultyInterface } from "./faculty.interface";

const AcademicFacultySchema = new Schema<AcademicFacultyInterface>({

    name: {
        type: String, required: true
    }


})



const AcademicFacultyModel = model<AcademicFacultyInterface>('AcademicFaculty', AcademicFacultySchema)

export default AcademicFacultyModel