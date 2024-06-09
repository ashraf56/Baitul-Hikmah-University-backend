import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.contant";
import { CourseFacultyInterface, CourseInterface } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";



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

  const session = await mongoose.startSession()
  try {

    session.startTransaction()
    const updateCourseinfo = await Course.findByIdAndUpdate(
      id,
      remaingCOurse,
      { new: true, runValidators: true , session}
    )


if (!updateCourseinfo) {
  throw new Error("Failed to update course!")
}
 if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // it will return truthy value of isDeleted feild
    const deletedPreCourse = preRequisiteCourses.filter((el) => el.course && el.isDeleted)
      .map(el => el.course)

    const deletedPreCourseresult = await Course.findByIdAndUpdate(
      id,
      {
        $pull: { preRequisiteCourses: { course: { $in: deletedPreCourse } } }
      },
      {
        new: true,
        runValidators: true, session
      }
    )
  if (!deletedPreCourseresult) {
    throw new Error ('Failed to update course!')
  }

    const newPreCourse = preRequisiteCourses.filter((el) => el.course && !el.isDeleted)
    const newPreCourseresult = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { preRequisiteCourses: { $each: newPreCourse } }
      },
      {
        new: true,
        runValidators: true,
        session
      }
    )
   
    
if (!newPreCourseresult) {
      throw new Error ('Failed to update course!')
}

  }
 await session.commitTransaction()
 await session.endSession()


 const result = await Course.findById(id).populate(
  'preRequisiteCourses.course',
);

return result;



  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error ('Failed to update course!')

  }


 
}




const AssignCourseFaculty = async (id:string, payload:Partial<CourseFacultyInterface>)=>{

const reslt = await CourseFaculty.findByIdAndUpdate(
  id,
  {
    $addToSet:{faculties:{$each:payload}}
  },
  {
    upsert:true,
    new:true
  }
)
return reslt

}



export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromdb,
  getSingleCourseFromDB,
  updateCourseintoDB,
  deleteCourseFromDB,
  AssignCourseFaculty
}