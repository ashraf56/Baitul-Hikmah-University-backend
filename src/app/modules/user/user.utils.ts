import { TAcademicSemester } from "../academicSemister/academic.interface";
import User from "./user.model";


const findLaststudentID = async () => {
    const lastStudent = await User.findOne({
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

    // byDefault currentID will be 0  
    let currentID = (0).toString(); // 0000

    // here is checking point for last student id. first time it's value will be undefined, when no student created. 
    const lastStudentID = await findLaststudentID(); // 2030 01 0001

    
   /* here is destructuring last semister code and year from lastStudentID.eg:
    if no student exist
    const lastsemistercode = undefined
    const lastsemisterYear = undefined
    if student exist then
    const lastsemistercode = 03
    const lastsemisterYear = 2032 */


    const lastsemistercode = lastStudentID?.substring(4, 6)// 01
    const lastsemisterYear = lastStudentID?.substring(0, 4)//2030

    // current YEar and code
    const currentYear = payload.year;
    const currentcode = payload.code;


    /*  
    It's will check the  last Year and code with current Year and Code. if the condition returns true
   then it returns currentID =  0001
  
   if no stududent exist then the conditon will  return fasle. 
   if ( undefined && undefined === 2032 && undefined ===03 ) {  currentID = 0  }
    
    let incrementedID = (Number(0) + 1).toString().padStart(4, '0')
    incrementedID = `${2032}${03}${1}`
    incrementedID will be 1 
    the id will be 2032030001
      
  after second time 
  
   if ( 203203001 && 2032 === 2032 && 03 ===03 ) {  currentID = 1  }

       let incrementedID = (Number(1) + 1).toString().padStart(4, '0') // 2
  
       incrementedID will be 2 
      incrementedID = `${2032}${03}${2}`
      the id will be 2032030002 df
  
      */

    if (
        lastStudentID && lastsemisterYear === currentYear && lastsemistercode === currentcode
    ) {
        currentID = lastStudentID?.substring(6) // 0001


    }

    let incrementedID = (Number(currentID) + 1).toString().padStart(4, '0')
    incrementedID = `${payload.year}${payload.code}${incrementedID}`

    return incrementedID
}