import { z } from "zod";
import { Days } from "./OfferedCourse.constant";



const timeStringSchema = z.string().refine(
    (time) => {
      const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // 00-09 10-19 20-23
      return regex.test(time);
    },
    {
      message: 'Invalid time format , expected "HH:MM" in 24 hours format',
    },
  );

const createOfferedCoursevalidation = z.object({

body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    section: z.number(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringSchema, // HH: MM   00-23: 00-59
    endTime: timeStringSchema,
}).refine((body)=>{
    const start = new Date(`2000T${body.startTime}`)
    const end = new Date(`2000T${body.endTime}`)
    return end >start
},{
    message:'Start time should be before End time !  '
})

})




export const OfferedCourseValidations = {
    createOfferedCoursevalidation
}