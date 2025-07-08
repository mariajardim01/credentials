import { NextFunction , Response, Request } from "express";
import httpStatus from "http-status";
import { ObjectSchema, options } from "joi";


export function validateSchema(schema: ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) =>{
        const validation = schema.validate(req.body, {abortEarly:false});
        if (validation.error){
            res.status(httpStatus.UNPROCESSABLE_ENTITY).send(validation.error.details.map(detail => detail.message))
            return
        }
      return next()
    }
}