import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { Authvalidations } from "./auth.validation";
import { AuthController } from "./auth.controller";



const router = Router()


router.post('/login', validateRequest(Authvalidations.loginValidationSchema),
AuthController.LoginUserController
)


export const Authroutes =router;