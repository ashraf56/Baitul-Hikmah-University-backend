import QueryBuilder from "../../builder/QueryBuilder";
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

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

export const semisterRagistrationService = {
  createSemesterRegistrationDB,
  getAllSemesterRegistrationsFromDB
}