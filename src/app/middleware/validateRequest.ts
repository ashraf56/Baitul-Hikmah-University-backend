import { Request, Response, NextFunction } from "express"
import { AnyZodObject } from "zod"
import { catchasync } from "../utils/catchAsync"


const validateRequest = (schema: AnyZodObject) => {
  return catchasync(
    async (req: Request, res: Response, next: NextFunction) => {
   


      await schema.parseAsync(
        {
          body: req.body,
          cookies:req.cookies

        }
      )


      next()
    
  }
  )
}

export default validateRequest


