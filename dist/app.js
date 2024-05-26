"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/modules/student/student.route");
const user_route_1 = require("./app/modules/user/user.route");
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const globalError_1 = __importDefault(require("./app/middleware/globalError"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/students', student_route_1.StudentRoute);
// User action
app.use('/api/v1/users', user_route_1.UserRouter);
app.get('/', (req, res) => {
    res.send('Hello Muslim World!');
});
app.use(globalError_1.default);
app.use(notFound_1.default);
exports.default = app;
