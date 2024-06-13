import { z } from "zod";



const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
const changePassValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old Password is required.' }),
    newpassword: z.string({ required_error: 'newPassword is required' }),
  }),
});


export const Authvalidations = {
  loginValidationSchema,
  changePassValidationSchema
}