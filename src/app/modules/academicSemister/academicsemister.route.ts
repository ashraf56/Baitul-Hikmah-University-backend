import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicsemister.validaton";
import { AcademicSemesterControllers } from "./academicsemister.controller";
import authRequestValidator from "../../middleware/authvalidator";


const router = Router()


router.post('/create-semister',authRequestValidator("admin"),
    validateRequest(AcademicSemesterValidation.createAcdemicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemesterController
)
router.get(
    '/:semesterId',authRequestValidator("admin"),
    AcademicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
    '/:semesterId',authRequestValidator("admin"),
    validateRequest(
        AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
);

router.get('/', authRequestValidator("admin"),AcademicSemesterControllers.getAllAcademicSemesters);


export const AcademicSemesterRouter = router