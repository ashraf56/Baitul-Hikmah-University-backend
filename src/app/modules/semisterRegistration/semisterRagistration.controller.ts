/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { catchasync } from "../../utils/catchAsync";
import { semisterRagistrationService } from "./semisterRagistration.service";


const createSemesterRegistrationController = catchasync(
  async (req, res) => {

    const payload = req.body

    const result = await semisterRagistrationService.createSemesterRegistrationDB(payload)


    res.status(200).json({
      success: true,
      message: 'Semester Registration success',
      data: result,
    })
  }
)


const updateSemisterRegitrationController = catchasync(
  async(req,res)=>{
    const { id } = req.params;
    const result =
      await semisterRagistrationService.SemesterRegistrationUpdate(
        id,
        req.body,
      );
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Semester Registration is Updated successfully !',
       data: result,
      })
  }
)


const getAllSemesterRegistrationsController = catchasync(
  async (req, res) => {
    const result =
      await semisterRagistrationService.getAllSemesterRegistrationsFromDB(
        req.query,
      );

    res.status(200).json({
      success: true,
      message: 'Semester Registration is retrieved successfully !',
      meta:result.meta,
      data: result.result,
    })

  },
);
const getSingleSemesterRegistrationsController = catchasync(
  async (req, res) => {
    const {id} = req.params as any
    const result =
      await semisterRagistrationService.getSinglesemesterRegistrationDB(
        id,
      );

    res.status(200).json({
      success: true,
      message: 'single Semester Registration is retrieved successfully !',
      data: result,
    })

  },
);

export const SemesterRegistrationController = {
  createSemesterRegistrationController,
  getAllSemesterRegistrationsController,
  updateSemisterRegitrationController,
  getSingleSemesterRegistrationsController

}