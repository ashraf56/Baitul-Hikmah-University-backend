import AcademicDepartment from "../academicDepartment/department.model";
import AcademicFaculty from "../academicFaculty/academicfaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semisterRegistration/semisterRagistration.model";
import { OfferedCourseInterface } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";



const createOfferedCourseIntoDB = async (payload: OfferedCourseInterface) => {

 
    const isSemesterRegistrationExists = await SemesterRegistration.findById(payload.semesterRegistration)
    if (!isSemesterRegistrationExists) {
        throw new Error('semesterRegistration not found')
    }
    const academicSemester = isSemesterRegistrationExists.academicSemester

    const isacademicFaculty = await AcademicFaculty.findById(payload.academicFaculty)
    if (!isacademicFaculty) {
        throw new Error('academicFaculty not found')

    }

    const  isacademicDepartment =await AcademicDepartment.findById(payload.academicDepartment)

    if (!isacademicDepartment) {
        throw new Error ('academicDepartment not found')

    }
    const  isacourse =await Course.findById(payload.course)

    if (!isacourse) {
        throw new Error ('course not found')

    }
    const isfaculty =await Faculty.findById(payload.faculty)

    if (!isfaculty) {
        throw new Error ('faculty not found')

    }

const result = await OfferedCourse.create({...payload,academicSemester})

return result
}





export const OfferedCourseServices = {
    createOfferedCourseIntoDB
}