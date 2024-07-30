import { Schema, model } from 'mongoose';
import { StudentsInfo } from './student.interface';

const Studentchema = new Schema<StudentsInfo>({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    name: {
        type: String,
        required: [true, 'name is required here'],
        maxlength: 20,
        trim: true,

    },
    password: { type: String },
    userid: {
        type: Schema.Types.ObjectId,
        required: [true, 'userID is required'],
        unique: true,
        ref: 'User'
    },
    adress: { type: String },
    contactnumber: { type: String, trim: true },
    country: { type: String, trim: true },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "The gender feild must be  only male and female"
        },
        trim: true,
        required: true
    },
    gardian: {
        fathersName: { type: String, trim: true },
        fathersNumber: { type: String, trim: true }
    },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    profileImg: { type: String }


}, {
    timestamps: true
})

// document middleware


// //query midleware
// Studentchema.pre("find", function (next) {
//     this.find({ isDeleted: { $ne: true } })
//     next()
// })


const Student = model<StudentsInfo>("Student", Studentchema)


export default Student