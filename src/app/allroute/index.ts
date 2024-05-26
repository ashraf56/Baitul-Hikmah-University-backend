import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { StudentRoute } from "../modules/student/student.route";

const router = Router();

const moduleRoute = [
    { 
        path:'/users',
        route:UserRouter
    },
    {
        path:'/students',
        route:StudentRoute
    }
]


moduleRoute.forEach(r=> router.use(r.path,r.route) )

export default router;