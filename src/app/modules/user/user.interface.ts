/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { UserRoles } from "./user.constant";

export interface UserInterface {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;



}


export type UserRoletypes = keyof typeof UserRoles

export interface UserModel extends Model<UserInterface> {
    isUserExistsByCustomId(id: string): Promise<UserInterface>;
    isPasswordMatch(plainTextPassword: string, hashpassword: string): Promise<boolean>;

}