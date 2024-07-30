
import express, { NextFunction, Request, Response } from "express"
import { UserController } from "./user.controller"
import validateRequest from "../../middleware/validateRequest"
import { createStudentsInfoZODSchema } from "../student/student.Zod"
import { FacultyValidations } from "../faculty/faculty.validation"
import { AdminValidations } from "../admin/admin.validation"
import authRequestValidator from "../../middleware/authvalidator"
import { UserRoles } from "./user.constant"
import { upload } from "../../utils/sendImageTOCloudinary"



const router = express.Router()


router.post('/create-student',
    authRequestValidator(UserRoles.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(createStudentsInfoZODSchema),
    UserController.createUsers)

router.post('/create-faculty', authRequestValidator('admin'),
    validateRequest(FacultyValidations.createFacultyValidationSchema),
    UserController.createFaculty)
router.post('/create-admin', validateRequest(AdminValidations.createAdminValidationSchema),
    UserController.createAdmin)
router.get('/me', authRequestValidator('student', 'faculty', 'admin'), UserController.getMeCOntroller);

export const UserRouter = router