import { TAcademicSemester } from "../academicSemister/academic.interface";


export const genarateSudentID = async (payload: TAcademicSemester) => {

    const currentID = (0).toString();
    let incrementedID = (Number(currentID) + 1).toString().padStart(4, '0')
    incrementedID = `${payload.year}${payload.code}${incrementedID}`
    return incrementedID
}