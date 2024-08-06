import httpStatus from "http-status";
import { catchasync } from "../../utils/catchAsync";
import { EnrollCoureseService } from "./enrollCourese.service";

const createEnrolledCourseController = catchasync(async (req, res) => {
 const id =req.user.id
    const result = await EnrollCoureseService.createEnrolledCourseIntoDB(id,req.body);

    res.status(httpStatus.OK).json({
        success: true,
        message: 'Student is enrolled succesfully',
        data: result,
    })

});


export const EnrollCoureseController = {
    createEnrolledCourseController
}