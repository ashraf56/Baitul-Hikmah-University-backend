import { TAcademicSemester } from "../academicSemister/academic.interface";
import UserModel from "./user.model";


const findLaststudentID = async () => {
    const lastStudent = await UserModel.findOne({
        role: 'student'
    }, {
        id: 1,
        _id: 0

    })
        .sort(
            {
                createdAt: -1
            }
        )
    return lastStudent?.id ? lastStudent?.id : undefined
}



export const genarateSudentID = async (payload: TAcademicSemester) => {


    let currentID =  (0).toString(); // 0000
const lastStudentID= await findLaststudentID(); // 2030 01 0001

const lastsemistercode  = lastStudentID?.substring(4,6)// 01
const lastsemisterYear = lastStudentID?.substring(0,4)//2030
const currentYear = payload.year;
const currentcode = payload.code;


if (
    lastStudentID && lastsemisterYear === currentYear && lastsemistercode ===currentcode
) {
    currentID = lastStudentID?.substring(6) // 0001
}


    let incrementedID = (Number(currentID) + 1).toString().padStart(4, '0')
    incrementedID = `${payload.year}${payload.code}${incrementedID}`
    return incrementedID
}