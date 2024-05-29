"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const notFoundroute = ((req, res, next) => {
    return res.status(404).json({
        success: false,
        message: 'route not found',
        error: ''
    });
});
exports.default = notFoundroute;
