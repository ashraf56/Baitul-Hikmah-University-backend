import { TAcademicSemester } from "../academicSemister/academic.interface";
import { AcademicSemester } from "../academicSemister/academic.model";
import { StudentsInfo } from "../student/student.interface";
import Student from "../student/student.schema";
import { UserInterface } from "./user.interface";
import User from "./user.model";
import { genarateSudentID } from "./user.utils";


const CreateUserDB = async (password: string, student: StudentsInfo) => {

    const newUserdata: Partial<UserInterface> = {}

    newUserdata.password = password || 'abc123'

    newUserdata.role = 'student'

    const admissionSemester = await AcademicSemester.findById(
        student.admissionSemester
    );
    if (!admissionSemester) {
        throw new Error('Admission semester not found');
    }

    newUserdata.id = await genarateSudentID(admissionSemester as TAcademicSemester)


    // it will create new user in the user colleciton
    const newUser = await User.create(newUserdata)

    if (Object.keys(newUser).length) {
        student.id = newUser.id
        student.userid = newUser._id

        // it will create student in the strudents collection
        const strudents = await Student.create(student)


        return strudents
    }


}



export const UserService = {
    CreateUserDB
}