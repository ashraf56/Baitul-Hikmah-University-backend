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


const RefreshTokenvalidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!'
    })
  })
})

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
  }),
});
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
    newpassword: z.string({
      required_error: 'User id is required!',
    }),
  }),
});


export const Authvalidations = {
  loginValidationSchema,
  changePassValidationSchema,
  RefreshTokenvalidation,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema
}