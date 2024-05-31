import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicDepartmentValidation } from "./department.validatin";
import { academicDepartmentCOntrollers } from "./department.controller";


const router = Router()


router.post('/create-department',
    validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema),
    academicDepartmentCOntrollers.createAcademicDepartmentController
)
router.get('/', academicDepartmentCOntrollers.getAllAcademicDepartmentController)
router.get('/:id', academicDepartmentCOntrollers.getSingleAcademicDepartmentController)
router.patch('/:id',
    validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema),
    academicDepartmentCOntrollers.updateAcademicDeartmentController
)


export const AcademicDepartmentRouter = router