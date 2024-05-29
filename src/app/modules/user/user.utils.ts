import { TAcademicSemester } from "../academicSemister/academic.interface";


export const genarateSudentID = (id:TAcademicSemester)=>{

const currentID = (0).toString();
let incrementedID = (Number(currentID)+1).toString().padStart(4,'0')
incrementedID = `${id.year}${id.code}${incrementedID}`
return incrementedID
}