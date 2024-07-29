import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { Authvalidations } from "./auth.validation";
import { AuthController } from "./auth.controller";
import authRequestValidator from "../../middleware/authvalidator";



const router = Router()


router.post('/login', validateRequest(Authvalidations.loginValidationSchema),
    AuthController.LoginUserController
)
router.post('/change-pass',
    authRequestValidator('admin', 'faculty', 'student'),
    validateRequest(Authvalidations.changePassValidationSchema),
    AuthController.ChangepassController
)
router.post('/refresh-token',
    validateRequest(Authvalidations.RefreshTokenvalidation),
    AuthController.RefreshTokenController
)
router.post('/forget-password',
    validateRequest(Authvalidations.forgetPasswordValidationSchema),
    AuthController.forgetPasswordController
)
router.post('/reset-password',
    validateRequest(Authvalidations.resetPasswordValidationSchema),
    AuthController.resetPasswordController
)



export const Authroutes = router;