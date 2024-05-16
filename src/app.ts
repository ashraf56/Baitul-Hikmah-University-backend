
import express, { Request, Response } from 'express';
import cors from 'cors'
import { StudentRoute } from './app/modules/student/student.route';
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/students', StudentRoute)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello Muslim World!')
})

app.post('/', (req: Request, res: Response) => {

  console.log(req.body);
  res.send({ message: 'Success' })


})

export default app;