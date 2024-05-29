import { Types } from "mongoose";

export type Gardian = {
    fathersName: string;
    fathersNumber: string;
}
export type Username = {

    firstName: string;
    lastName: string;

}

export interface StudentsInfo {
    id: string;
    email: string;
    password: string;
    userid: Types.ObjectId;
    name: Username;
    adress: string;
    country: string;
    contactnumber: string;
    gardian?: Gardian;
    gender: "male" | "female";
    admissionSemester: Types.ObjectId;


}