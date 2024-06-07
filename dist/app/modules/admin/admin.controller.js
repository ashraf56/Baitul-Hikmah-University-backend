"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const admin_service_1 = require("./admin.service");
const getSingleAdminController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.Adminservice.getSingleAdminFromDB(id);
    res.status(200).json({
        success: true,
        message: 'Admin is retrieved succesfully',
        data: result,
    });
}));
const getAllAdminsController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.Adminservice.getAllAdminsFromDB(req.query);
    res.status(200).json({
        success: true,
        message: 'Admins are retrieved succesfully',
        data: result,
    });
}));
const updateAdminController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { admin } = req.body;
    const result = yield admin_service_1.Adminservice.updateAdminIntoDB(id, admin);
    res.status(200).json({
        success: true,
        message: 'Admin is updated succesfully',
        data: result,
    });
}));
const deleteAdminController = (0, catchAsync_1.catchasync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.Adminservice.deleteAdminFromDB(id);
    res.status(200).json({
        success: true,
        message: 'Admin is deleted succesfully',
        data: result,
    });
}));
exports.AdminControllers = {
    getAllAdminsController, getSingleAdminController, updateAdminController, deleteAdminController
};
