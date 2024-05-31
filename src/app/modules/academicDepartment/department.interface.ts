import { Types } from 'mongoose';

export type AcademicDepartmentInterface = {
    name: string;
    academicFaculty: Types.ObjectId;
};