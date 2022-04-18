import{NextFunction, Request, Response } from "express";

export function validationSchema(schema: any) {
    return (req:Request, res: Response, next:NextFunction) => { 
      const validation = schema.validate(req.body);
      if(!req.headers['x-api-key']){
        return res.status(422).send("Missing x-api-key header");
      }
      if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
      }   
      next();
    }
}