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

// const getdeletStudent = async (id: string) => {

//     const res = await Student.updateOne({ id }, { isDeleted: true })

//     return res
// }

const getStudentsFromDB = async (query: Record<string, unknown>) => {
    const queryObject = { ...query }

    let searchinfo = ''
    if (query?.searchinfo) {
        searchinfo = query?.searchinfo as string
    }
    // searchQuery
    const searchQuery = Student.find({
        $or: ['email', 'name'].map((feild) => ({

            [feild]: { $regex: searchinfo, $options: 'i' }
        }))

    })

    const removeFeildfromQuery = ['searchinfo', 'sort', 'limit']
    removeFeildfromQuery.forEach((el) => delete queryObject[el])

    const filterQuery = searchQuery.find(queryObject).populate('admissionSemester')
    let sort = '-createdAt'
    if (query.sort) {
        sort = query.sort as string
    }
    const sortQuery = filterQuery.sort(sort)
    let limit = 3
    if (query.limit) {
        limit = query.limit as number;
    }

    const limitQuery = await sortQuery.limit(limit);


    return limitQuery
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
    getStudentsFromDB, deleteStudentFromDB
}