import { Router } from "express";
import { AcademicFacultyControllers } from "./academicfaculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcdemicFacultyValidation } from "./academicfaculty.validation";


const router = Router()


router.post('/create-academicfaculty',
    validateRequest(AcdemicFacultyValidation.createAcdemicFacultyValidationSchema),
    AcademicFacultyControllers.createAcdemicFacultyController)

router.get('/', AcademicFacultyControllers.getAllAcademicFacultyController)
router.get('/:id', AcademicFacultyControllers.getSingleAcademicFacultyController)
router.patch('/:id', AcademicFacultyControllers.updateAcademicFacultyController)



export const AcademicFacultyRouter = router;