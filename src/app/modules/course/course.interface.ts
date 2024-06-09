import { Types } from "mongoose";


export type TPreRequisiteCourses ={
    course: Types.ObjectId;
    isDeleted: boolean;

}

export interface CourseInterface {

    title: string;
    prefix: string;
    code: number;
    credits: number;
    isDeleted?: boolean;
    preRequisiteCourses: [TPreRequisiteCourses];

}



export interface CourseFacultyInterface {
    course: Types.ObjectId;
    faculties:[Types.ObjectId]

}