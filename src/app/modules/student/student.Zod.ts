import { z } from "zod";

export const GardianSchema = z.object({
    fathersName: z.string().trim().optional(),
    fathersNumber: z.string().trim().optional()
});



export const createStudentsInfoZODSchema = z.object({
    body: z.object({
        password: z.string().optional(),
        student: z.object({
            name: z.string().trim().max(20, 'name cannot exceed 20 characters'),
            adress: z.string().optional(),
            contactnumber: z.string().trim().optional(),
            country: z.string().trim().optional(),
            gender: z.enum(['male', 'female']).optional(),
            gardian: GardianSchema.optional()
        })
    })
});


export const StudentZODSchema = {
    createStudentsInfoZODSchema
}