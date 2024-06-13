
import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { FacultyValidations } from './faculty.validation';
import authRequestValidator from '../../middleware/authvalidator';
import { UserRoles } from '../user/user.constant';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
    '/:id',
    validateRequest(FacultyValidations.updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', authRequestValidator(UserRoles.admin,UserRoles.faculty), FacultyControllers.getAllFaculties);

export const FacultyRouter = router;
