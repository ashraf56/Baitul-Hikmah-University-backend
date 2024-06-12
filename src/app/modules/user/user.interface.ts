import { Model } from "mongoose";

export interface UserInterface {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;



}



export interface UserModel extends Model<UserInterface> {
    myStaticMethod(): number;
  }