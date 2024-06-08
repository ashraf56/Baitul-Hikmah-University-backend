import { CourseInterface } from "./course.interface";
import Course from "./course.model";



const createCourseIntoDB = async (payload:CourseInterface)=>{

    const reslt = await Course.create(payload)
    return reslt

}



export const CourseServices = {
    createCourseIntoDB
}