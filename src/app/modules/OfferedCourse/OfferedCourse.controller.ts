import { catchasync } from "../../utils/catchAsync";
import { OfferedCourseServices } from "./OfferedCourse.service";



const createOfferedCourseController = catchasync(
    async (req, res) => {

        const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body)



        res.status(200).json({
            success: true,
            message: 'Offered Courses is created succesfully',
            data: result,
        })

    }
)



export const OfferedCourseController = {
    createOfferedCourseController
}