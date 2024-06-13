import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { OfferedCourseValidations } from "./OfferedCourse.validation";
import { OfferedCourseController } from "./OfferedCourse.controller";



const router = Router()


router.post('/create-offered-course', validateRequest(OfferedCourseValidations.createOfferedCoursevalidation),

    OfferedCourseController.createOfferedCourseController)




export const OfferedCourseRoute = router