import { TAcademicSemester } from "../academicSemister/academic.interface";
import { AcademicSemesterModel } from "../academicSemister/academic.model";
import { StudentsInfo } from "../student/student.interface";
import StudentsModal from "../student/student.schema";
import { UserInterface } from "./user.interface";
import UserModel from "./user.model";
import { genarateSudentID } from "./user.utils";


const CreateUserDB = async (password: string, student: StudentsInfo) => {

    const newUserdata: Partial<UserInterface> = {}

    newUserdata.password = password || 'abc123'

    newUserdata.role = 'student'

    const admissionSemester= await AcademicSemesterModel.findById(
        student.admissionSemester
      );
      if (!admissionSemester) {
        throw new Error( 'Admission semester not found');
        }
      
    newUserdata.id= await  genarateSudentID(admissionSemester as TAcademicSemester)
   
   
    // it will create new user in the user colleciton
    const newUser = await UserModel.create(newUserdata)

    if (Object.keys(newUser).length) {
        student.id = newUser.id
        student.userid = newUser._id

        // it will create student in the strudents collection
        const strudents = await StudentsModal.create(student)
   console.log(strudents);
   
        return strudents
    }


}



export const UserService = {
    CreateUserDB
}