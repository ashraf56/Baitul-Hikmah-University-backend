import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";
import authRequestValidator from "../../middleware/authvalidator";

const router = Router();

router.post(
    '/create-course',authRequestValidator('admin','superAdmin'),
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourseController,
);

router.get('/:id', authRequestValidator('admin','superAdmin','student','faculty'),CourseControllers.getSingleCourseController);

router.delete('/:id', authRequestValidator('admin','superAdmin'), CourseControllers.deleteCourseController);

router.get('/', authRequestValidator('admin','superAdmin','student','faculty'), CourseControllers.getAllCourseController);
router.patch('/:id',authRequestValidator('admin','superAdmin'), validateRequest(CourseValidations.updateCourseValidationSchema),
    CourseControllers.getUpdateCourseController)


// Course Faculty route
router.delete('/:courseID/remove-course',
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.RemoveCourseFacultyController
)

router.put('/:courseID/assign-course',
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.AssignCourseFacultyController)

export const CourseRouter = router;