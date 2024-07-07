
import express, { Request, Response } from 'express';
import cors from 'cors'
import notFoundroute from './app/middleware/notFound';
import GlobalErrorhandller from './app/middleware/globalError';
import router from './app/allroute';
import cookieParser from 'cookie-parser';
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:['http://localhost:5173'], credentials:true}))
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello  World!')
})

app.use(GlobalErrorhandller)

app.use(notFoundroute)


export default app;