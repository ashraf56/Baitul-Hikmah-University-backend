import { z } from "zod";

const createEnrolledCourseValidationZodSchema = z.object({
    body: z.object({
        OfferedCourse: z.string(),
    }),
});

const updateEnrolledCourseMarksValidationZodSchema = z.object({
    body: z.object({
        semisterRegistration: z.string(),
        OfferedCourse: z.string(),
        student: z.string(),
        courseMarks: z.object({
            classTest1: z.number().optional(),
            midTerm: z.number().optional(),
            classTest2: z.number().optional(),
            finalTerm: z.number().optional(),
        }),
    }),
});

export const EnrolledCourseValidations = {
    createEnrolledCourseValidationZodSchema,
    updateEnrolledCourseMarksValidationZodSchema,
};