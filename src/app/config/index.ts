import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })


export default {
    port: process.env.PORT,
    dbs: process.env.DATABASE_URL,
    node_Env: process.env.Node_Env,
    jwt_Token: process.env.JWT_sec_Token,
    saltNumber: process.env.saltNumber,
    JWT_Refresh_token: process.env.JWT_Refresh_token

}