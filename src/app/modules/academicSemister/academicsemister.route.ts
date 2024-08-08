import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicsemister.validaton";
import { AcademicSemesterControllers } from "./academicsemister.controller";
import authRequestValidator from "../../middleware/authvalidator";


const router = Router()


router.post('/create-semister', authRequestValidator('superAdmin', "admin"),
    validateRequest(AcademicSemesterValidation.createAcdemicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemesterController
)
router.get(
    '/:semesterId', authRequestValidator("superAdmin", "admin"),
    AcademicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
    '/:semesterId', authRequestValidator("superAdmin", "admin"),
    validateRequest(
        AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
);

router.get('/', authRequestValidator("superAdmin", "admin"), AcademicSemesterControllers.getAllAcademicSemesters);


export const AcademicSemesterRouter = router