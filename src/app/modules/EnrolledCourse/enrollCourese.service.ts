/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ErrorApp from "../../errors/ErrorApp";
import { OfferedCourse } from "../OfferedCourse/OfferedCourse.model"
import { enrollCoureseInterface } from "./enrollCourese.interface"
import Student from "../student/student.schema";
import EnrollCourese from "./enrollCourese.model";
import { Course } from "../course/course.model";
import { SemesterRegistration } from "../semisterRegistration/semisterRagistration.model";
import { startSession } from "mongoose";
import { Faculty } from "../faculty/faculty.model";
import { calculateGradeAndPoints } from "./enrollCourse.utill";

const createEnrolledCourseIntoDB = async (id: string, payload: enrollCoureseInterface) => {

  const { offeredCourse } = payload

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)

  if (!isOfferedCourseExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new ErrorApp(httpStatus.BAD_GATEWAY, 'Room is full !');
  }

  const student = await Student.findOne({ id: id }, { _id: 1 });

  if (!student) {
    throw new ErrorApp(httpStatus.BAD_GATEWAY, 'Student not found ! !');
  }
  // checking student already enrolled or not 
  const isStudentAlreadyEnrolled = await EnrollCourese.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });


  if (isStudentAlreadyEnrolled) {
    throw new ErrorApp(httpStatus.CONFLICT, 'Student is already enrolled !');
  }


  // check total credits exceeds maxCredit
  const course = await Course.findById(isOfferedCourseExists.course);
  const currentCredit = course?.credits;

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit');

  const maxCredit = semesterRegistration?.maxCredit;


  const enrolledCourses = await EnrollCourese.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'Course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);


  //  total enrolled credits + new enrolled course credit > maxCredit
  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

  if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
    throw new ErrorApp(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits !',
    );
  }

  const session = await startSession();

  try {
    session.startTransaction();

    const result = await EnrollCourese.create(
      [
        {
          semisterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemister: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new ErrorApp(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this cousre !',
      );
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
}


const updateEnrolledCourseMarksIntoDB = async (
  id: string,
  payload: Partial<enrollCoureseInterface>,
) => {
  const { semisterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semisterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new ErrorApp(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'Offered course not found !');
  }
  const isStudentExists = await Student.findById(student);

  if (!isStudentExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const faculty = await Faculty.findOne({ id: id }, { _id: 1 });


  if (!faculty) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const isCourseBelongToFaculty = await EnrollCourese.findOne({
    semisterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new ErrorApp(httpStatus.FORBIDDEN, 'You are forbidden! !');
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.5);

    const result = calculateGradeAndPoints(totalMarks);
  console.log({totalMarks});
  console.log({result});
  
    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrollCourese.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true,
    },
  );

  return result;
};


export const EnrollCoureseService = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB
}