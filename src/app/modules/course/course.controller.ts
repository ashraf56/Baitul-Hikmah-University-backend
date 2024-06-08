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

const getAllCourseController = catchasync(async (req, res) => {
   
    const result = await CourseServices.getAllCourseFromdb(req.query)
    
    
    res.status(200).json({
        success: true,
        message: "Courses are retrieved successfully",
        data: result
    })

});

const getSingleCourseController = catchasync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id)

    res.status(200).json({
        success: true,
        message: "Course is retrieved successfully",
        data: result
    })
  });



export const CourseControllers = {
    createCourseController,
    getAllCourseController,
     getSingleCourseController
}