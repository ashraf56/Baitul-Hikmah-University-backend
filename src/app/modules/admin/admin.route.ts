import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import { AdminValidations } from "./admin.validation";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

router.get('/', AdminControllers.getAllAdminsController);

router.get('/:id', AdminControllers.getSingleAdminController);

router.patch(
    '/:id',
    validateRequest(AdminValidations.updateAdminValidationSchema),
    AdminControllers.updateAdminController,
);

router.delete('/:id', AdminControllers.deleteAdminController);



export const AddminRouter = router