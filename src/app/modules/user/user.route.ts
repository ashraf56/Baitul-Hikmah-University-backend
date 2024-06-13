
import express from "express"
import { UserController } from "./user.controller"
import validateRequest from "../../middleware/validateRequest"
import { createStudentsInfoZODSchema } from "../student/student.Zod"
import { FacultyValidations } from "../faculty/faculty.validation"
import { AdminValidations } from "../admin/admin.validation"
import authRequestValidator from "../../middleware/authvalidator"
import { UserRoles } from "./user.constant"



const router = express.Router()


router.post('/create-student', authRequestValidator(UserRoles.admin),
    validateRequest(createStudentsInfoZODSchema),
    UserController.createUsers)
router.post('/create-faculty',
    validateRequest(FacultyValidations.createFacultyValidationSchema),
    UserController.createFaculty)
router.post('/create-admin', validateRequest(AdminValidations.createAdminValidationSchema),
    UserController.createAdmin)

export const UserRouter = router