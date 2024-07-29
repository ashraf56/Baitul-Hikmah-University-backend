import express from "express"
import { StudentController } from "./student.controller"
import authRequestValidator from "../../middleware/authvalidator"

const router = express.Router()


router.get('/', StudentController.getAllstudent)
router.get('/:id',authRequestValidator('admin','faculty'), StudentController.getSingleStudentController)
router.delete('/:id', StudentController.deletStudentController)

export const StudentRoute = router;