import { Schema, model } from 'mongoose';
import { StudentsInfo } from './student.interface';



const Userschema = new Schema<StudentsInfo>({

    name: { type: String, required: true },
    adress: { type: String },
    contactnumber: { type: String },
    country: { type: String },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    gardian: {
        fathersName: { type: String },
        fathersNumber: { type: String }
    }



})


const StudentsModal = model<StudentsInfo>("Student", Userschema)


export default StudentsModal