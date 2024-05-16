import { StudentsInfo } from "./student.interface";
import StudentsModal from "./student.schema";

const createStudentintoDB = async (student: StudentsInfo) => {
    // it is used for create a data  from StudentsModal into DB 

    const result = await StudentsModal.create(student)

    return result
}

const getStudentsFromDB = async ()=>{
    const rss = await StudentsModal.find()
    return rss
}
export const StudentService = {
    createStudentintoDB, getStudentsFromDB
}