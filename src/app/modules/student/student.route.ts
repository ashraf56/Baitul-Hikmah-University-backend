import express from "express"
import { StudentController } from "./student.controller"

const router = express.Router()
// StudentController.createStudents it is a controller for createstudent route


router.get('/', StudentController.getAllstudent)
router.delete('/:id', StudentController.deletStudent)
export const StudentRoute = router;