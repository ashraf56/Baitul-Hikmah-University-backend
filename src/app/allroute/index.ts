import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { StudentRoute } from "../modules/student/student.route";
import { AcademicSemesterRouter } from "../modules/academicSemister/academicsemister.route";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicfaculty.route";
import { AcademicDepartmentRouter } from "../modules/academicDepartment/department.route";

const router = Router();

const moduleRoute = [
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/students',
        route: StudentRoute
    },

    {
        path: '/academic',
        route: AcademicSemesterRouter
    },
    
    {
        path: '/faculty',
        route: AcademicFacultyRouter
    },
    {
        path: '/department',
        route: AcademicDepartmentRouter
    },
]


moduleRoute.forEach(r => router.use(r.path, r.route))

export default router;