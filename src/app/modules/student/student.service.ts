import { startSession } from "mongoose";
import Student from "./student.schema";
import User from "../user/user.model";
import { searchablefeild } from "./student.constant";
import QueryBuilder from "../../builder/QueryBuilder";


const getStudentsFromDB = async (query: Record<string, unknown>) => {
    // const queryObject = { ...query }

    // let searchinfo = ''
    // if (query?.searchinfo) {
    //     searchinfo = query?.searchinfo as string
    // }
    // // searchQuery
    // const searchablefeild = ['email', 'name']

    // const searchQuery = Student.find({
    //     $or: searchablefeild.map((feild) => ({

    //         [feild]: { $regex: searchinfo, $options: 'i' }
    //     }))

    // })

    // const removeFeildfromQuery = ['searchinfo', 'sort', 'limit', 'page', 'skip', 'fields']
    // removeFeildfromQuery.forEach((el) => delete queryObject[el])

    // const filterQuery = searchQuery.find(queryObject).populate('admissionSemester')
    // let sort = '-createdAt'
    // if (query.sort) {
    //     sort = query.sort as string
    // }
    // const sortQuery = filterQuery.sort(sort)
    // // PAGINATION FUNCTIONALITY:
    // let limit = 3;
    // let page = 1;
    // let skip = 0

    // if (query.limit) {
    //     limit = query.limit as number;
    // }
    // if (query.page) {
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // }
    // const paginateQuery = sortQuery.skip(skip);

    // const limitQuery = paginateQuery.limit(limit);

    // // FIELDS LIMITING FUNCTIONALITY:
    // let fields = '-__v'
    // if (query.fields) {
    //     fields = (query.fields as string).split(',').join(' ');

    // }


    // const fieldQuery = await limitQuery.select(fields);

    // return fieldQuery;


    
  const studentQuery = new QueryBuilder(
    Student.find(),
    query,
  )
    .search(searchablefeild)
    .filter()
    .sort()
    .paginate()
    .fields()
    

   

  const result = await studentQuery.modelQuery
  return result;



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

const updatestudentDataintoDB = async()=>{
    // see modeule 13.12 video
}

export const StudentService = {
    getStudentsFromDB, deleteStudentFromDB,updatestudentDataintoDB
}