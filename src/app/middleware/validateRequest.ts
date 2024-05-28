import { Request, Response } from "express"
import { AnyZodObject } from "zod"


const Validaterequest = (schema:AnyZodObject)=>{
    return async (req:Request,res:Response,next:NewableFunction)=>{
        await schema.parseAsync(
            {
                body:req.body
            }
        )
        next()
    }
}


export default Validaterequest