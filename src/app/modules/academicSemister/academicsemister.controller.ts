import { catchasync } from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicsemister.service";




const createAcademicSemesterController = catchasync(
  async (req, res) => {
    const acamedicData = req.body;
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(acamedicData)


    res.status(200).json({
      success: true,
      message: "AcademicSemester successfully created",
      data: result
    })
  }
)

const getAllAcademicSemesters = catchasync(
  async (req, res) => {

    const payload = req.query
    const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB(payload);
  
   
    res.status(200).json({
      success: true,
      message: "Academic semester is retrieved succesfully",
      data: result
    })
  });

const getSingleAcademicSemester = catchasync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  res.status(200).json({
    success: true,
    message: "Academic semester is retrieved succesfully'",
    data: result
  })
});


const updateAcademicSemester = catchasync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Academic semester is retrieved succesfully'",
    data: result
  })
});

export const AcademicSemesterControllers = {
  createAcademicSemesterController,
  getAllAcademicSemesters, getSingleAcademicSemester,
  updateAcademicSemester
}