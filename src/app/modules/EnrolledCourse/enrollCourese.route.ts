import { Router } from "express";
import { EnrollCoureseController } from "./enrollCourese.controller";
import { EnrolledCourseValidations } from "./enrollCourese.validation";
import validateRequest from "../../middleware/validateRequest";
import authRequestValidator from "../../middleware/authvalidator";

const router = Router();

router.post(
    '/create-enrolled-course',
    authRequestValidator('student'),
    validateRequest(
      EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
    ),
    EnrollCoureseController.createEnrolledCourseController,
  );
  
  export const EnrollCourseRoutes = router;