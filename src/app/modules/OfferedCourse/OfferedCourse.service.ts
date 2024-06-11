import AcademicDepartment from "../academicDepartment/department.model";
import AcademicFaculty from "../academicFaculty/academicfaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semisterRegistration/semisterRagistration.model";
import { OfferedCourseInterface } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";



const createOfferedCourseIntoDB = async (payload: OfferedCourseInterface) => {
    const { academicDepartment, academicFaculty, section, semesterRegistration, course } = payload
    const isSemesterRegistrationExists = await SemesterRegistration.findById(payload.semesterRegistration)
    if (!isSemesterRegistrationExists) {
        throw new Error('semesterRegistration not found')
    }
    const academicSemester = isSemesterRegistrationExists.academicSemester

    const isacademicFaculty = await AcademicFaculty.findById(payload.academicFaculty)
    if (!isacademicFaculty) {
        throw new Error('academicFaculty not found')

    }

    const isacademicDepartment = await AcademicDepartment.findById(payload.academicDepartment)

    if (!isacademicDepartment) {
        throw new Error('academicDepartment not found')

    }
    const isacourse = await Course.findById(payload.course)

    if (!isacourse) {
        throw new Error('course not found')

    }
    const isfaculty = await Faculty.findById(payload.faculty)

    if (!isfaculty) {
        throw new Error('faculty not found')

    }

    // if academic dep is not belog into the academic faculty 

    const isAcademicDepartment_belog_to_academicFaculty = await AcademicDepartment.findOne(
        {
            _id: academicDepartment, academicFaculty
        })
    if (!isAcademicDepartment_belog_to_academicFaculty) {
        throw new Error(`${isacademicDepartment.name} is not belog into ${isacademicFaculty.name}`)

    }
    // checking for same section course and semister reg
    const isSame_SemisterReg_Section_Course = await OfferedCourse.findOne({
        section, semesterRegistration, course
    })
    if (isSame_SemisterReg_Section_Course) {
        throw new Error(`Offered course with same section is already exist!`)

    }
    const result = await OfferedCourse.create({ ...payload, academicSemester })

    return result
}





export const OfferedCourseServices = {
    createOfferedCourseIntoDB
}