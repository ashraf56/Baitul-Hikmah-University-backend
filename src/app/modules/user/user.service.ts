/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TAcademicSemester } from "../academicSemister/academicsemister.interface";
import { AcademicSemester } from "../academicSemister/academicsemister.model";
import { StudentsInfo } from "../student/student.interface";
import Student from "../student/student.schema";
import { UserInterface } from "./user.interface";
import User from "./user.model";
import { genarateSudentID, generateAdminId, generateFacultyId } from "./user.utils";
import { Facultyinterface } from "../faculty/faculty.interface";
import AcademicDepartment from "../academicDepartment/department.model";
import { Faculty } from "../faculty/faculty.model";
import { Admin } from "../admin/admin.model";
import { sendImageTOcloudinary } from "../../utils/sendImageTOCloudinary";
import ErrorApp from "../../errors/ErrorApp";
import httpStatus from "http-status";
import { Admininterface } from "../admin/admin.interface";



const CreateUserDB = async (file: any, password: string, payload: StudentsInfo) => {

    const newUserdata: Partial<UserInterface> = {}

    newUserdata.password = password || 'abc123'

    newUserdata.role = 'student'
    newUserdata.email = payload.email
    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester
    );
    if (!admissionSemester) {
        throw new Error('Admission semester not found');
    }
    const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment)

    if (!academicDepartment) {
        throw new ErrorApp(httpStatus.NOT_FOUND, 'AcademicDepartment not found')
    }
    payload.academicFaculty = academicDepartment.academicFaculty;

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        newUserdata.id = await genarateSudentID(admissionSemester as TAcademicSemester)

        // sending image into cloudinary 
        if (file) {
            const imageName = `UsersID${newUserdata.id}`;
            const path = file?.path
            const { secure_url } = await sendImageTOcloudinary(imageName, path)
            payload.profileImg = secure_url as string   // set cloudinary image url link in the profile image 
        }

        // it will create new user in the user colleciton
        const newUser = await User.create([newUserdata], { session })

        if (!newUser.length) {
            throw new Error('Failed to create user')
        }


        payload.id = newUser[0].id
        payload.userid = newUser[0]._id


        // it will create student in the strudents collection
        const students = await Student.create([payload], { session })
        if (!students.length) {
            throw new Error('Failed to create student')
        }
        await session.commitTransaction()
        await session.endSession()
        return students

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to complete transition')

    }


}







const CreateFacultyDB = async (file: any, password: string, payload: Facultyinterface) => {

    const newUserdata: Partial<UserInterface> = {}

    newUserdata.password = password || 'abc123'

    newUserdata.role = 'faculty'
    newUserdata.email = payload.email

    const academicdepartment = await AcademicDepartment.findById(
        payload.academicdepartment,
    );


    if (!academicdepartment) {
        throw new ErrorApp(httpStatus.NOT_FOUND, 'academic Department  not found');

    }
    payload.academicFaculty = academicdepartment.academicFaculty
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        newUserdata.id = await generateFacultyId()
        // sending image into cloudinary 
        if (file) {
            const imageName = `UsersID${newUserdata.id}`;
            const path = file?.path
            const { secure_url } = await sendImageTOcloudinary(imageName, path)
            payload.profileImg = secure_url as string   // set cloudinary image url link in the profile image 
        }

        // it will create new user in the user colleciton
        const newUser = await User.create([newUserdata], { session })


        if (!newUser.length) {
            throw new Error('Failed to create user')
        }

        payload.id = newUser[0].id
        payload.user = newUser[0]._id
        // it will create student in the strudents collection
        const faculties = await Faculty.create([payload], { session })
        if (!faculties.length) {
            throw new Error('Failed to create faculty')
        }
        await session.commitTransaction()
        await session.endSession()



        return faculties

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to complete transition')

    }


}


const createAdminIntoDB = async (file: any, password: string, payload: Admininterface) => {
    // create a user object
    const userData: Partial<UserInterface> = {};

    //if password is not given , use deafult password
    userData.password = password || 'abc123'

    //set admin role
    userData.role = 'admin';
    //set admin email
    userData.email = payload.email

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // sending image into cloudinary 
        if (file) {
            const imageName = `UsersID${userData.id}`;
            const path = file?.path
            const { secure_url } = await sendImageTOcloudinary(imageName, path)
            payload.profileImg = secure_url as string   // set cloudinary image url link in the profile image 
        }

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new Error('Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new Error('Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};


const getMe = async (id: string, role: string) => {


    let result = null;
    if (role === 'student') {
        result = await Student.findOne({ id: id }).populate('user');
    }
    if (role === 'admin') {
        result = await Admin.findOne({ id: id }).populate('user');
    }

    if (role === 'faculty') {
        result = await Faculty.findOne({ id: id }).populate('user');
    }

    return result;

}




export const UserService = {
    CreateUserDB, CreateFacultyDB, createAdminIntoDB, getMe
}