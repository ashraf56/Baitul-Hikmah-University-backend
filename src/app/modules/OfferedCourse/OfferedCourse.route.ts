import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { OfferedCourseValidations } from "./OfferedCourse.validation";
import { OfferedCourseController } from "./OfferedCourse.controller";
import authRequestValidator from "../../middleware/authvalidator";



const router = Router()


router.post('/create-offered-course',
    authRequestValidator('admin',"superAdmin"),
     validateRequest(OfferedCourseValidations.createOfferedCoursevalidation),

    OfferedCourseController.createOfferedCourseController)




export const OfferedCourseRoute = router