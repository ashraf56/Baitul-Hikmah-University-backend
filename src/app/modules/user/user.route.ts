
import express from "express"
import { UserController } from "./user.controller"
import validateRequest from "../../middleware/validateRequest"
import { createStudentsInfoZODSchema } from "../student/student.Zod"
import { FacultyValidations } from "../faculty/faculty.validation"



const router = express.Router()


router.post('/create-student',
    validateRequest(createStudentsInfoZODSchema),
    UserController.createUsers)
router.post('/create-faculty',
    validateRequest(FacultyValidations.createFacultyValidationSchema),
    UserController.createFaculty)


export const UserRouter = router