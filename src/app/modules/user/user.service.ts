import { StudentsInfo } from "../student/student.interface";
import StudentsModal from "../student/student.schema";
import { UserInterface } from "./user.interface";
import UserModel from "./user.model";


const CreateUserDB = async (password: string, student: StudentsInfo) => {

    const newUserdata: Partial<UserInterface> = {}

    newUserdata.password = password || 'abc123'

    newUserdata.role = 'student'
    newUserdata.id = '203010200'
    // it will create new user in the user colleciton
    const newUser = await UserModel.create(newUserdata)

    if (Object.keys(newUser).length) {
        student.id = newUser.id
        student.userid = newUser._id

        // it will create student in the strudents collection
        const strudents = await StudentsModal.create(student)

        return strudents
    }


}



export const UserService = {
    CreateUserDB
}