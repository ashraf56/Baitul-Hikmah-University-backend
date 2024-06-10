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


export const SemesterRegistrationController = {
createSemesterRegistrationController
}