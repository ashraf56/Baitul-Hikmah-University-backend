
import express, { Request, Response } from 'express';
import cors from 'cors'
import notFoundroute from './app/middleware/notFound';
import GlobalErrorhandller from './app/middleware/globalError';
import router from './app/allroute';
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', router)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello Muslim World!')
})

app.use(GlobalErrorhandller)

app.use(notFoundroute)


export default app;