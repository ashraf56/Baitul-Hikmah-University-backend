"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    port: process.env.PORT,
    dbs: process.env.DATABASE_URL,
    node_Env: process.env.Node_Env,
    jwt_Token: process.env.JWT_sec_Token,
    saltNumber: process.env.saltNumber,
    JWT_Refresh_token: process.env.JWT_Refresh_token,
    FrogetPassUr: process.env.FrogetPassURL,
    Cloud_Name: process.env.Cloud_name,
    Api_key: process.env.Api_key,
    Api_Secret: process.env.Api_Secret
};
