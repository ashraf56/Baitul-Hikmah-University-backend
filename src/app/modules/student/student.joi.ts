import Joi from 'joi'

const studentjoi = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'ID is required',
    }),
    password: Joi.string().required().max(10).trim(),
    name: Joi.string().required().max(20).trim(),
    adress: Joi.string().optional(),
    contactnumber: Joi.string().trim().optional(),
    country: Joi.string().trim().optional(),
    gender: Joi.string().valid('male', 'female').required().messages({
        'any.only': 'The gender field must be only male and female',
        'any.required': 'Gender is required'
    }),
    gardian: Joi.object({
        fathersName: Joi.string().trim().optional(),
        fathersNumber: Joi.string().trim().optional()
    }).optional(),
    isDeleted: Joi.boolean().optional()
});


export default studentjoi;