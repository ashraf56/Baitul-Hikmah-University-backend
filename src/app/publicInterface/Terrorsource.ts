export type ErrorSource = {
    path: string | number,
    message: string
}[];



export type TGenericErrorResponse = {
    statuscode: number;
    message: string;
    errorsource: ErrorSource;
};