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


const deleteCourseController = catchasync(
    async (req, res) => {
        const { id } = req.params;
        const result = await CourseServices.deleteCourseFromDB(id)

        res.status(200).json({
            success: true,
            message: "Course is Deleted successfully",
            data: result
        })
    });



const getUpdateCourseController = catchasync(
    async (req, res) => {

        const { id } = req.params;
        const payload = req.body

        const result = await CourseServices.updateCourseintoDB(id, payload);

        res.status(200).json({
            success: true,
            message: "Course is Updated successfully",
            data: result
        })
    }
)


const AssignCourseFacultyController = catchasync(
    async (req, res) => {
        const { courseID } = req.params;
        const { faculties } = req.body;

        const assignRes = await CourseServices.AssignCourseFaculty(courseID, faculties)

        res.status(200).json({
            success: true,
            message: "Assign faculty into Course is successfully done",
            data: assignRes
        })
    }
)
const RemoveCourseFacultyController = catchasync(
    async (req, res) => {
        const { courseID } = req.params;
        const { faculties } = req.body;

        const assignRes = await CourseServices.removeCourseFacultyDB(courseID, faculties)

        res.status(200).json({
            success: true,
            message: "Remove faculty from Course  is successfully done",
            data: assignRes
        })
    }
)


export const CourseControllers = {
    createCourseController,
    getAllCourseController,
    getSingleCourseController,
    deleteCourseController,
    getUpdateCourseController,
    AssignCourseFacultyController,
    RemoveCourseFacultyController
}