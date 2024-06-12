import { NextFunction, Request, Response } from "express"
import { catchasync } from "../utils/catchAsync"


const authRequestValidator = () => {
    return catchasync(
      async (req: Request, res: Response, next: NextFunction) => {
     
     const token = req.headers.authorization
  console.log(token);
  
  
        next()
      
    }
    )
  }


  export default authRequestValidator