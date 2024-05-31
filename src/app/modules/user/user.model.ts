import { Schema, model } from "mongoose";
import { UserInterface } from "./user.interface";


const UserSchema = new Schema<UserInterface>({

    id: {
        type: String, required: true,unique:true
    }
    ,
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: {
            values: ['in-progress', 'blocked']
        },
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },




},
    {
        timestamps: true
    })



const User = model<UserInterface>("User", UserSchema)

export default User