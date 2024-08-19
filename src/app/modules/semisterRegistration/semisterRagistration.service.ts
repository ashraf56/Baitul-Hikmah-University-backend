import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import ErrorApp from "../../errors/ErrorApp";
import { AcademicSemester } from "../academicSemister/academicsemister.model";
import { RegistrationStatus } from "./semisterRagistration.constants";
import { SemesterRegistrationInterface } from "./semisterRagistration.interface";
import { SemesterRegistration } from "./semisterRagistration.model";






const createSemesterRegistrationDB = async (payload: SemesterRegistrationInterface) => {

  const academicSemester = payload.academicSemester
  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new Error(
      `There is aready an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
    );
  }
  const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)

  if (!isAcademicSemesterExists) {
    throw new Error(
      'This academic semester not found !',
    );
  }
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({ academicSemester })
  if (isSemesterRegistrationExists) {
    throw new Error(
      'This semester is already registered!',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;

}
const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await semesterRegistrationQuery.metaCount()
  const result = await semesterRegistrationQuery.modelQuery;
  return {
    meta,
    result
  };
};


const getSinglesemesterRegistrationDB = async (id: string) => {

  const result = await SemesterRegistration.findById(id);
  return result;
}


const SemesterRegistrationUpdate = async (id: string, payload: Partial<SemesterRegistrationInterface>) => {

  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'This semester is not found !');
  }

  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new ErrorApp(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }
  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new ErrorApp(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new ErrorApp(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
}



export const semisterRagistrationService = {
  createSemesterRegistrationDB,
  getAllSemesterRegistrationsFromDB,
  SemesterRegistrationUpdate,
  getSinglesemesterRegistrationDB
}