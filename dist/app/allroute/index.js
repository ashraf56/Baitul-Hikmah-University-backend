"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
const academic_route_1 = require("../modules/academicSemister/academic.route");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: '/users',
        route: user_route_1.UserRouter
    },
    {
        path: '/students',
        route: student_route_1.StudentRoute
    },
    {
        path: '/academic',
        route: academic_route_1.AcademicSemesterRouter
    }
];
moduleRoute.forEach(r => router.use(r.path, r.route));
exports.default = router;
