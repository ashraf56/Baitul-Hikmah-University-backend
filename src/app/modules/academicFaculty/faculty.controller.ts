import { catchasync } from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./faculty.service";


const createAcdemicFacultyController = catchasync(
    async (req, res) => {

        const { faculty } = req.body;
        const result = await AcademicFacultyServices.createAcdemicFacultyDB(faculty)

        res.status(200).json({
            success: true,
            message: "new faculty created",
            data: result
        })

    }
)

const getAllAcademicFacultyController = catchasync(
    async(req,res)=>{
        const allfaculty = await AcademicFacultyServices.getAllAcademicFacultyFromDB()
        res.status(200).json({
            success: true,
            message: "All faculty retrive successfully",
            data: allfaculty
        })

        
    }
)


export const AcademicFacultyControllers = {
    createAcdemicFacultyController,
    getAllAcademicFacultyController
}