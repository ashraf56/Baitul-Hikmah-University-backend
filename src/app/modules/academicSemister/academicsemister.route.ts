import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicsemister.validaton";
import { AcademicSemesterControllers } from "./academicsemister.controller";


const router = Router()


router.post('/create-semister',
    validateRequest(AcademicSemesterValidation.createAcdemicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemesterController
)
router.get(
    '/:semesterId',
    AcademicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
    '/:semesterId',
    validateRequest(
        AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);


export const AcademicSemesterRouter = router