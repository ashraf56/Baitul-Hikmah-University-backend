import { Schema, model } from "mongoose";
import { CourseFacultyInterface, CourseInterface, TPreRequisiteCourses } from "./course.interface";

export const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false
})

const courseSchema = new Schema<CourseInterface>({
    title: {
        type: String, unique: true,
        trim: true,
        required: true,
    },
    prefix: {
        type: String,
        trim: true,
        required: true,
    },
    code: {
        type: Number,
        trim: true,
        required: true,
    },
    credits: {
        type: Number,
        trim: true,
        required: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})



const CourseFacultySchema = new Schema<CourseFacultyInterface>(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            unique: true,

        },
        faculties: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Faculty'
            }
        ]
    }
)





export const Course = model<CourseInterface>('Course', courseSchema)
export const CourseFaculty = model<CourseFacultyInterface>('CourseFaculty', CourseFacultySchema)



