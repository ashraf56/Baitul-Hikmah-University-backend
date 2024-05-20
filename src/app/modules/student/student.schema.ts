import { Schema, model } from 'mongoose';
import { StudentsInfo } from './student.interface';



const Userschema = new Schema<StudentsInfo>({
    id: { type: String, required: true, unique: true },
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
    }



})


const StudentsModal = model<StudentsInfo>("Student", Userschema)


export default StudentsModal