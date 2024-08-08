import { Schema, model } from "mongoose";
import { UserInterface, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const UserSchema = new Schema<UserInterface, UserModel>({

    id: {
        type: String, required: true, unique: true
    }
    ,
    email: {
        type: String, required: true, unique: true
    }
    ,
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: { type: Date },
    role: {
        type: String,
        enum: ['super-admin','student', 'faculty', 'admin']
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


UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select('+password')
}
UserSchema.statics.isPasswordMatch = async function (plainTextPassword, hashpassword) {
    return await bcrypt.compare(plainTextPassword, hashpassword);
}

// this method will check if user password is  changed then the current issued token will be unauthroized
UserSchema.statics.is_jwt_Issued_Before_Password_Change = function (
    passwordChangeTime: Date, jwtIssueTime: number
) {
    // convert time into mili sec
    const password_Change_Times = new Date(passwordChangeTime).getTime() / 1000;
    return password_Change_Times > jwtIssueTime

}
const User = model<UserInterface, UserModel>("User", UserSchema)

export default User