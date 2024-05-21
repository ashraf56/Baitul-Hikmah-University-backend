import { Schema, model } from 'mongoose';
import { StudentsInfo } from './student.interface';
import bcrypt from 'bcrypt'

const Userschema = new Schema<StudentsInfo>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: [true, 'password is required here'], maxlength: 10 },
    name: {
        type: String,
        required: [true, 'name is required here'],
        maxlength: 20,
        trim: true,

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
    isDeleted: {
        type: Boolean,
        default: false
    }


})

// document middleware

Userschema.pre('save', async function (next) {
    const saltNumber = 10
    this.password = await bcrypt.hash(this.password, saltNumber)
    next()
})

Userschema.post('save', function (doc, next) {
    doc.password = ""
    next()
})

//query midleware
Userschema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})


const StudentsModal = model<StudentsInfo>("Student", Userschema)


export default StudentsModal