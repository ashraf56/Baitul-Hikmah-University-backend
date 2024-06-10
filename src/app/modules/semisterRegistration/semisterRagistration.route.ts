

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semisterRagistrationValidation } from './semisterRagistration.validation';
import { SemesterRegistrationController } from './semisterRagistration.controller';


const router = express.Router();

router.post('/create-semester-registration',
    validateRequest(semisterRagistrationValidation.createSemesterRegistrationValidationSchema),
    SemesterRegistrationController.createSemesterRegistrationController
)


export const SemisterRagistrationroute = router;
