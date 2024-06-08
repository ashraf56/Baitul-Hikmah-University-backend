import QueryBuilder from "../../builder/QueryBuilder";
import { CourseInterface } from "./course.interface";
import Course from "./course.model";



const createCourseIntoDB = async (payload: CourseInterface) => {

    const reslt = await Course.create(payload)
    return reslt

}

const getAllCourseFromdb = async (query: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(Course.find(), query)
    const result = await courseQuery.modelQuery
    return result
}


const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
    );
    return result;
};


const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
      },
    );
    return result;
  };

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromdb,
    getSingleCourseFromDB,
    deleteCourseFromDB
}