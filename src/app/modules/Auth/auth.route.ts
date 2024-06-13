import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { Authvalidations } from "./auth.validation";
import { AuthController } from "./auth.controller";
import authRequestValidator from "../../middleware/authvalidator";
import { UserRoles } from "../user/user.constant";



const router = Router()


router.post('/login', validateRequest(Authvalidations.loginValidationSchema),
    AuthController.LoginUserController
)
router.post('/change-pass',
    authRequestValidator(UserRoles.admin, UserRoles.faculty, UserRoles.student),
    validateRequest(Authvalidations.changePassValidationSchema),
    AuthController.ChangepassController
)


export const Authroutes = router;