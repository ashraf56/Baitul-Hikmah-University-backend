import httpStatus from "http-status";
import { catchasync } from "../../utils/catchAsync";
import { EnrollCoureseService } from "./enrollCourese.service";

const createEnrolledCourseController = catchasync(async (req, res) => {

    const result = await EnrollCoureseService.createEnrolledCourseIntoDB();

    res.status(httpStatus.OK).json({
        success: true,
        message: 'Student is enrolled succesfully',
        data: result,
    })

});


export const EnrollCoureseController = {
    createEnrolledCourseController
}