

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semisterRagistrationValidation } from './semisterRagistration.validation';
import { SemesterRegistrationController } from './semisterRagistration.controller';
import authRequestValidator from '../../middleware/authvalidator';


const router = express.Router();

router.post('/create-semester-registration', authRequestValidator('superAdmin','admin'),
    validateRequest(semisterRagistrationValidation.createSemesterRegistrationValidationSchema),
    SemesterRegistrationController.createSemesterRegistrationController
)
router.get('/', authRequestValidator('superAdmin','admin','faculty','student'),
 SemesterRegistrationController.getAllSemesterRegistrationsController)

export const SemisterRagistrationroute = router;
