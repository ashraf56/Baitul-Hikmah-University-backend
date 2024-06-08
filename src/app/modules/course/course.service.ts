import QueryBuilder from "../../builder/QueryBuilder";
import { CourseInterface } from "./course.interface";
import Course from "./course.model";



const createCourseIntoDB = async (payload:CourseInterface)=>{

    const reslt = await Course.create(payload)
    return reslt

}

const  getAllCourseFromdb = async(query:Record<string,unknown>)=>{

    const courseQuery = new QueryBuilder(Course.find(),query)

return courseQuery
}



export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromdb
}