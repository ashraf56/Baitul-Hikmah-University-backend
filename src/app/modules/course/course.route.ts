import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";

const router = Router();

router.post(
    '/create-course',
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourseController,
);

router.get('/:id', CourseControllers.getSingleCourseController);

router.delete('/:id', CourseControllers.deleteCourseController);

router.get('/', CourseControllers.getAllCourseController);
router.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema),
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