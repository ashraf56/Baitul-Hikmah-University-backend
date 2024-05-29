import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academic.validaton";
import { AcademicSemesterControllers } from "./academic.controller";


const router = Router()


router.post('/create-semister',
validateRequest(AcademicSemesterValidation.createAcdemicSemesterValidationSchema),
AcademicSemesterControllers.createAcademicSemesterController
)