"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const globalError_1 = __importDefault(require("./app/middleware/globalError"));
const allroute_1 = __importDefault(require("./app/allroute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', allroute_1.default);
app.get('/', (req, res) => {
    res.send('Hello Muslim World!');
});
app.use(globalError_1.default);
app.use(notFound_1.default);
exports.default = app;
