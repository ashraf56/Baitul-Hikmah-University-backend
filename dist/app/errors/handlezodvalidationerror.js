"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlezodvalidationerror = (error) => {
    const errorsource = error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[(issue === null || issue === void 0 ? void 0 : issue.path.length) - 1],
            message: issue.message
        };
    });
    const statuscode = 400;
    return {
        statuscode,
        message: "our validation error",
        errorsource
    };
};
exports.default = handlezodvalidationerror;
