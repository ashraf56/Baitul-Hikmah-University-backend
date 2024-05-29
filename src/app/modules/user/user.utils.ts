import { TAcademicSemester } from "../academicSemister/academic.interface";
import UserModel from "./user.model";


const findLaststudentID = async ()=>{
const lastStudent = await UserModel.findOne({
    role:'student'
},{
    id:1,
    _id:0

})
.sort(
    {
        createdAt:-1
    }
)
return lastStudent?.id ? lastStudent?.id.substring(6) : undefined
}



export const genarateSudentID = async (payload: TAcademicSemester) => {

    const currentID = (await findLaststudentID()) || (0).toString();
    let incrementedID = (Number(currentID) + 1).toString().padStart(4, '0')
    incrementedID = `${payload.year}${payload.code}${incrementedID}`
    return incrementedID
}