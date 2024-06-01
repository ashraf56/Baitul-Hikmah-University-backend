import { startSession } from "mongoose";
import Student from "./student.schema";
import User from "../user/user.model";

// const createStudentintoDB = async (student: StudentsInfo) => {
//     // it is used for create a data  from StudentsModal into DB 

//     // const result = await StudentsModal.create(student) // built in static instamce method 
//     const result = new StudentsModal(student)
//     const res = result.save()
//     return res
// }

const getdeletStudent = async (id: string) => {

    const res = await Student.updateOne({ id }, { isDeleted: true })

    return res
}

const getStudentsFromDB = async () => {
    const rss = await Student.find().populate('admissionSemester')
    return rss
}

const deleteStudentFromDB = async (id: string) => {

    const session = await startSession()
    try {
        session.startTransaction()
        const deletstudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session })

        if (!deletstudent) {
            throw new Error('Delete transition is faild')
        }

        const deletuser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session })

        if (!deletuser) {
            throw new Error('Delete transition is faild')
        }

        await session.commitTransaction()
        await session.endSession()
        return deletstudent

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to delete student');

    }
}



export const StudentService = {
    getStudentsFromDB, getdeletStudent, deleteStudentFromDB
}