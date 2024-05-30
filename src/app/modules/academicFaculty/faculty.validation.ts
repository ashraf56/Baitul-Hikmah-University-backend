import { z } from "zod";

const createAcdemicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Password must be string',
        })
    })
})


export const AcdemicFacultyValidation = {
    createAcdemicFacultyValidationSchema
}
