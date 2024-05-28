"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchasync = void 0;
const catchasync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error => next(error)));
    };
};
exports.catchasync = catchasync;
