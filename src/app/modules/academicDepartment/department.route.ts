import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicDepartmentValidation } from "./department.validatin";
import { academicDepartmentCOntrollers } from "./department.controller";
import authRequestValidator from "../../middleware/authvalidator";


const router = Router()


router.post('/create-department',
    authRequestValidator('superAdmin','admin'),
    validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema),
    academicDepartmentCOntrollers.createAcademicDepartmentController
)
router.get('/', authRequestValidator('superAdmin','admin'), academicDepartmentCOntrollers.getAllAcademicDepartmentController)
router.get('/:id',authRequestValidator('superAdmin','admin') ,academicDepartmentCOntrollers.getSingleAcademicDepartmentController)
router.patch('/:id',
    authRequestValidator('superAdmin','admin'),
    validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema),
    academicDepartmentCOntrollers.updateAcademicDeartmentController
)


export const AcademicDepartmentRouter = router