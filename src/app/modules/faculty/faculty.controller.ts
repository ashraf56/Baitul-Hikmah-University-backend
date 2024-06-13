import { catchasync } from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.service";

const getSingleFaculty = catchasync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);

    res.status(200).json({
        success: true,
        message: 'Faculty is retrieved succesfully',
        data: result,
    })

});

const getAllFaculties = catchasync(async (req, res) => {

   console.log(req.cookies);
   
    
    const result = await FacultyServices.getAllFacultiesFromDB(req.query);

    res.status(200).json({
        success: true,
        message: 'Faculty are retrieved succesfully',
        data: result,
    })
});

const updateFaculty = catchasync(async (req, res) => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await FacultyServices.updateFacultyIntoDB(id, faculty);
    res.status(200).json({
        success: true,
        message: 'Faculty is updated succesfully',
        data: result,
    })

});

const deleteFaculty = catchasync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(id);

    res.status(200).json({
        success: true,
        message: 'Faculty is deleted succesfully',
        data: result,
    })

});

export const FacultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty,
};