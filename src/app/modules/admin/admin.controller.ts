import { catchasync } from "../../utils/catchAsync";
import { Adminservice } from "./admin.service";

const getSingleAdminController = catchasync(async (req, res) => {
  const { id } = req.params;
  const result = await Adminservice.getSingleAdminFromDB(id);


  res.status(200).json({
    success: true,
    message: 'Admin is retrieved succesfully',
    data: result,
  })

});

const getAllAdminsController = catchasync(async (req, res) => {
  const result = await Adminservice.getAllAdminsFromDB(req.query);

  res.status(200).json({
    success: true,
    message: 'Admins are retrieved succesfully',
    data: result,
  })

});

const updateAdminController = catchasync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await Adminservice.updateAdminIntoDB(id, admin);


  res.status(200).json({
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  })
});

const deleteAdminController = catchasync(async (req, res) => {
  const { id } = req.params;
  const result = await Adminservice.deleteAdminFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Admin is deleted succesfully',
    data: result,
  })

});



export const AdminControllers = {
  getAllAdminsController, getSingleAdminController, updateAdminController, deleteAdminController
}