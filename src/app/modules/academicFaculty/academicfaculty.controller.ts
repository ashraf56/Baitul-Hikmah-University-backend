import { catchasync } from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicfaculty.service";


const createAcdemicFacultyController = catchasync(
    async (req, res) => {

        const payload = req.body;
        const result = await AcademicFacultyServices.createAcdemicFacultyDB(payload)

        res.status(200).json({
            success: true,
            message: "new faculty created",
            data: result
        })

    }
)

const getAllAcademicFacultyController = catchasync(
    async (req, res) => {
        const allfaculty = await AcademicFacultyServices.getAllAcademicFacultyFromDB()
        res.status(200).json({
            success: true,
            message: "All faculty retrive successfully",
            data: allfaculty
        })


    }
)

const getSingleAcademicFacultyController = catchasync(
    async (req, res) => {
        const { id } = req.params;
        const singlefaculty = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id)
        res.status(200).json({
            success: true,
            message: "single faculty retrive successfully",
            data: singlefaculty
        })

    }
)

const updateAcademicFacultyController = catchasync(
    async (req, res) => {
        const { id } = req.params;
        const payload = req.body;


        const updateddata = await AcademicFacultyServices.updateAcademicFacultyIntoDB(id, payload)

        res.status(200).json({
            success: true,
            message: "Academic faculty is Updated succesfully'",
            data: updateddata
        })
    }
)


export const AcademicFacultyControllers = {
    createAcdemicFacultyController,
    getAllAcademicFacultyController,
    getSingleAcademicFacultyController,
    updateAcademicFacultyController
}