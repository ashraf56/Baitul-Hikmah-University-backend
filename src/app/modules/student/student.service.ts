import Student from "./student.schema";

// const createStudentintoDB = async (student: StudentsInfo) => {
//     // it is used for create a data  from StudentsModal into DB 

//     // const result = await StudentsModal.create(student) // built in static instamce method 
//     const result = new StudentsModal(student)
//     const res = result.save()
//     return res
// }

const getdeletStudent = async (id: string) => {

    const res = await Student.updateOne({ id }, { isDeleted: true })

    return res
}

const getStudentsFromDB = async () => {
    const rss = await Student.find().populate('admissionSemester')
    return rss
}
export const StudentService = {
    getStudentsFromDB, getdeletStudent
}