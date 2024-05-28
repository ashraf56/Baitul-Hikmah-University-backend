
import express from "express"
import { UserController } from "./user.controller"
import validateRequest from "../../middleware/validateRequest"
import { createStudentsInfoZODSchema } from "../student/student.Zod"



const router = express.Router()


router.post('/create-student',
validateRequest(createStudentsInfoZODSchema),
 UserController.createUsers)


export const UserRouter = router