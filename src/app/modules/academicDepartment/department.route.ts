import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicDepartmentValidation } from "./department.validatin";
import { academicDepartmentCOntrollers } from "./department.controller";


const router = Router()


router.post('/create-department', 
validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema),
academicDepartmentCOntrollers.createAcademicDepartmentController
)