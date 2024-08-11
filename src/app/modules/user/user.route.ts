
import express, { NextFunction, Request, Response } from "express"
import { UserController } from "./user.controller"
import validateRequest from "../../middleware/validateRequest"
import { createStudentsInfoZODSchema } from "../student/student.Zod"
import { FacultyValidations } from "../faculty/faculty.validation"
import { AdminValidations } from "../admin/admin.validation"
import authRequestValidator from "../../middleware/authvalidator"
import { upload } from "../../utils/sendImageTOCloudinary"



const router = express.Router()


router.post('/create-student',
    authRequestValidator('superAdmin', 'admin'),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(createStudentsInfoZODSchema),
    UserController.createUsers)

router.post('/create-faculty', authRequestValidator('superAdmin', 'admin'),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(FacultyValidations.createFacultyValidationSchema),
    UserController.createFaculty)
router.post('/create-admin',
    authRequestValidator('superAdmin'),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(AdminValidations.createAdminValidationSchema),
    UserController.createAdmin)
router.get('/me', authRequestValidator('superAdmin', 'student', 'faculty', 'admin'), UserController.getMeCOntroller);

export const UserRouter = router