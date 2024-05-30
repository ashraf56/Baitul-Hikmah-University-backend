import { Router } from "express";
import { AcademicFacultyControllers } from "./faculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcdemicFacultyValidation } from "./faculty.validation";


const router = Router()


router.post('/create-faculty', 
validateRequest(AcdemicFacultyValidation.createAcdemicFacultyValidationSchema),
    AcademicFacultyControllers.createAcdemicFacultyController)

router.get('/', AcademicFacultyControllers.getAllAcademicFacultyController)
router.get('/:id', AcademicFacultyControllers.getSingleAcademicFacultyController)
router.patch('/:id', AcademicFacultyControllers.updateAcademicFacultyController)



export const AcademicFacultyRouter = router;