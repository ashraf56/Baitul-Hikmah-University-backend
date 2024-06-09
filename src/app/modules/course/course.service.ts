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


const updateCourseintoDB = async (id: string, payload: Partial<CourseInterface>) => {

  const { preRequisiteCourses, ...remaingCOurse } = payload


  const updateCourseinfo = await Course.findByIdAndUpdate(id, remaingCOurse, { new: true, runValidators: true })

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // it will return truthy value of isDeleted feild
    const deletedPreCourse = preRequisiteCourses.filter((el) => el.course && el.isDeleted)
      .map(el => el.course)

    const deletedPreCourseresult = await Course.findByIdAndUpdate(
      id,
      {
        $pull: { preRequisiteCourses: { course: { $in: deletedPreCourse } } }
      }
    )
    return deletedPreCourseresult

  }


  return updateCourseinfo
}



export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromdb,
  getSingleCourseFromDB,
  updateCourseintoDB,
  deleteCourseFromDB
}