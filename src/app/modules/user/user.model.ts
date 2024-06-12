import { Schema, model } from "mongoose";
import { UserInterface, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const UserSchema = new Schema<UserInterface,UserModel>({

    id: {
        type: String, required: true,unique:true
    }
    ,
    password: { type: String, required: true, select:0 },
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

    this.password = await bcrypt.hash(this.password, Number(config.saltNumber))
    next()
})

UserSchema.post('save', function (doc, next) {
    doc.password = ""
    next()
})


UserSchema.statics.isUserExistsByCustomId = async function (id:string) {
   return await User.findOne({id}).select('+password')
}
UserSchema.statics.isPasswordMatch= async function (plainTextPassword,hashpassword) {
    return await bcrypt.compare(plainTextPassword, hashpassword);
 }

const User = model<UserInterface,UserModel>("User", UserSchema)

export default User