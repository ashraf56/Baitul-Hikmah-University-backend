"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const admin_constant_1 = require("./admin.constant");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
});
const AdminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    },
    designation: {
        type: String,
        required: [true, 'Designation is required'],
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: admin_constant_1.Gender,
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required'],
    },
    bloogGroup: {
        type: String,
        enum: {
            values: admin_constant_1.BloodGroup,
            message: '{VALUE} is not a valid blood group',
        },
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String, default: '' },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
AdminSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
AdminSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
AdminSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.Admin = (0, mongoose_1.model)('Admin', AdminSchema);
