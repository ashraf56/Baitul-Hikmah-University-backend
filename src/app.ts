
import express, { Request, Response } from 'express';
import cors from 'cors'
import { StudentRoute } from './app/modules/student/student.route';
import { UserRouter } from './app/modules/user/user.route';
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/students', StudentRoute)

// User action
app.use('/api/v1/users', UserRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Muslim World!')
})


export default app;