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
    name: Username;
    adress: string;
    country: string;
    contactnumber: string;
    avatar?: string;
    gardian?: Gardian;
    gender: "male" | "female"

}