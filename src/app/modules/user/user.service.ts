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


const CreateUserDB = async (password: string, student: StudentsInfo) => {

    const newUserdata: Partial<UserInterface> = {}

    newUserdata.password = password || 'abc123'

    newUserdata.role = 'student'

    const admissionSemester = await AcademicSemester.findById(
        student.admissionSemester
    );
    if (!admissionSemester) {
        throw new Error('Admission semester not found');
    }

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        newUserdata.id = await genarateSudentID(admissionSemester as TAcademicSemester)


        // it will create new user in the user colleciton
        const newUser = await User.create([newUserdata], { session })

        if (!newUser.length) {
            throw new Error('Failed to create user')
        }

        student.id = newUser[0].id
        student.userid = newUser[0]._id
        // it will create student in the strudents collection
        const students = await Student.create([student], { session })
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







const CreateFacultyDB = async (password: string, payload: Facultyinterface) => {

    const newUserdata: Partial<UserInterface> = {}

    newUserdata.password = password || 'abc123'

    newUserdata.role = 'faculty'

    const  academicdepartment = await AcademicDepartment.findById(
        payload.academicdepartment
    );
   
    
    if (!academicdepartment) {
        throw new Error('academic Department  not found');
    }

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        newUserdata.id = await generateFacultyId()


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
            throw new Error('Failed to create student')
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


const createAdminIntoDB = async (password: string, payload: Facultyinterface) => {
    // create a user object
    const userData: Partial<UserInterface> = {};
  
    //if password is not given , use deafult password
    userData.password = password || 'abc123'
  
    //set student role
    userData.role = 'admin';
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
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
  
export const UserService = {
    CreateUserDB, CreateFacultyDB,createAdminIntoDB
}