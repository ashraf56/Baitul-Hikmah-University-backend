import { catchasync } from "../../utils/catchAsync";
import { CourseServices } from "./course.service";


const createCourseController = catchasync(
    async (req, res) => {
        const payload = req.body;
        const coursedata = await CourseServices.createCourseIntoDB(payload)

        res.status(200).json({
            success: true,
            message: "new course created",
            data: coursedata
        })

    }
)



export const CourseControllers = {
    createCourseController
}