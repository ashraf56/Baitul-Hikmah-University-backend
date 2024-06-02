import express from "express"
import { StudentController } from "./student.controller"

const router = express.Router()


router.get('/', StudentController.getAllstudent)
router.delete('/:id', StudentController.deletStudentController)
export const StudentRoute = router;