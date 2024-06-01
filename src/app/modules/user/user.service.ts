import mongoose from "mongoose";
import { TAcademicSemester } from "../academicSemister/academic.interface";
import { AcademicSemester } from "../academicSemister/academic.model";
import { StudentsInfo } from "../student/student.interface";
import Student from "../student/student.schema";
import { UserInterface } from "./user.interface";
import User from "./user.model";
import { genarateSudentID } from "./user.utils";


const CreateUserDB = async (password: string, student: StudentsInfo) => {

    const newUserdata: Partial<UserInterface> = {}

    newUserdata.password = password || 'abc123'

    newUserdata.role = 'student'

    const admissionSemester = await AcademicSemester.findById(
        student.admissionSemester
    );
    if (!admissionSemester) {
        throw new Error('Admission semester not found');
    }

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        newUserdata.id = await genarateSudentID(admissionSemester as TAcademicSemester)


        // it will create new user in the user colleciton
        const newUser = await User.create([newUserdata], { session })

        if (!newUser.length) {
            throw new Error('Failed to create user')
        }

        student.id = newUser[0].id
        student.userid = newUser[0]._id
        // it will create student in the strudents collection
        const students = await Student.create([student], { session })
        if (!students.length) {
            throw new Error('Failed to create student')
        }
        await session.commitTransaction()
        await session.endSession()
        return students

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to complete transition')

    }


}



export const UserService = {
    CreateUserDB
}