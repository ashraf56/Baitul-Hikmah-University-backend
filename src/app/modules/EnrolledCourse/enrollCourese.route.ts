import { Router } from "express";
import { EnrollCoureseController } from "./enrollCourese.controller";
import { EnrolledCourseValidations } from "./enrollCourese.validation";
import validateRequest from "../../middleware/validateRequest";
import authRequestValidator from "../../middleware/authvalidator";

const router = Router();

router.post(
    '/create-enroll-course',
    authRequestValidator('student'),
    validateRequest(
      EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
    ),
    EnrollCoureseController.createEnrolledCourseController,
  );
  
  router.patch(
    '/update-enrolled-course-marks',
    authRequestValidator('faculty'),
    validateRequest(
      EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
    ),
    EnrollCoureseController.updateEnrolledCourseMarks,
  );

  export const EnrollCourseRoutes = router;