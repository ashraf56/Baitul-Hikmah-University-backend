import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.contant";
import { CourseInterface } from "./course.interface";
import Course from "./course.model";



const createCourseIntoDB = async (payload: CourseInterface) => {

    const reslt = await Course.create(payload)
    return reslt

}

const getAllCourseFromdb = async (query: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query).search(CourseSearchableFields)
    .filter().sort().paginate().fields()
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


const updateCourseintoDB = async (id:string,payload:Partial<CourseInterface>)=>{

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { preRequisiteCourses , ...remaingCOurse}= payload


  const updateCourseinfo = await Course.findByIdAndUpdate(id,remaingCOurse, {new:true,runValidators:true})

return updateCourseinfo
}



export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromdb,
    getSingleCourseFromDB,
    updateCourseintoDB,
    deleteCourseFromDB
}