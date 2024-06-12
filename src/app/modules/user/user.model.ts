import { Schema, model } from "mongoose";
import { UserInterface, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';

const UserSchema = new Schema<UserInterface,UserModel>({

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


UserSchema.pre('save', async function (next) {
   
    const saltNumber = 10
    this.password = await bcrypt.hash(this.password, saltNumber)
    next()
})

UserSchema.post('save', function (doc, next) {
    doc.password = ""
    next()
})

const User = model<UserInterface,UserModel>("User", UserSchema)

export default User