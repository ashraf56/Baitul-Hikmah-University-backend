import { Router } from "express";
import { AcademicFacultyControllers } from "./academicfaculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcdemicFacultyValidation } from "./academicfaculty.validation";
import authRequestValidator from "../../middleware/authvalidator";


const router = Router()


router.post('/create-academicfaculty',authRequestValidator('admin'),
    validateRequest(AcdemicFacultyValidation.createAcdemicFacultyValidationSchema),
    AcademicFacultyControllers.createAcdemicFacultyController)

router.get('/',authRequestValidator('admin','faculty','student'), AcademicFacultyControllers.getAllAcademicFacultyController)
router.get('/:id',authRequestValidator('admin','faculty','student') ,AcademicFacultyControllers.getSingleAcademicFacultyController)
router.patch('/:id',authRequestValidator('admin'), AcademicFacultyControllers.updateAcademicFacultyController)



export const AcademicFacultyRouter = router;