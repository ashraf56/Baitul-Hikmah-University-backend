import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { StudentRoute } from "../modules/student/student.route";
import { AcademicSemesterRouter } from "../modules/academicSemister/academicsemister.route";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicfaculty.route";
import { AcademicDepartmentRouter } from "../modules/academicDepartment/department.route";
import { FacultyRouter } from "../modules/faculty/faculty.route";
import { AddminRouter } from "../modules/admin/admin.route";
import { CourseRouter } from "../modules/course/course.route";
import { SemisterRagistrationroute } from "../modules/semisterRegistration/semisterRagistration.route";
import { OfferedCourseRoute } from "../modules/OfferedCourse/OfferedCourse.route";
import { Authroutes } from "../modules/Auth/auth.route";
import { EnrollCourseRoutes } from "../modules/EnrolledCourse/enrollCourese.route";

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
        path: '/academicsemister',
        route: AcademicSemesterRouter
    },

    {
        path: '/academicfaculty',
        route: AcademicFacultyRouter
    },
    {
        path: '/department',
        route: AcademicDepartmentRouter
    },
    {
        path: '/faculty',
        route: FacultyRouter
    },
    {
        path: '/admin',
        route: AddminRouter
    },
    {
        path: '/course',
        route: CourseRouter
    },
    {
        path: '/semister-reg',
        route: SemisterRagistrationroute
    },
    {
        path: '/offered-course',
        route: OfferedCourseRoute
    },
    {
        path: '/auth',
        route: Authroutes
    },
    {
        path: '/enroll-courese',
        route: EnrollCourseRoutes
    }
]


moduleRoute.forEach(r => router.use(r.path, r.route))

export default router;