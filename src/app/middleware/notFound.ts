import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const notFoundroute = ((req: Request, res: Response, next: NextFunction) => {

    return res.status(404).json({
        success: false,
        message: 'route not found',
        error: ''

    })


})

export default notFoundroute