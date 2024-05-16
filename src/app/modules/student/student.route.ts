import express from "express"
import { StudentController } from "./student.controller"

const router = express.Router()
// StudentController.createStudents it is a controller for createstudent route
router.post('/createstudent', StudentController.createStudents)



export  const StudentRoute= router;