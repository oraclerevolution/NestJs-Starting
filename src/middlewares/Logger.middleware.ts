import { Response, Request } from "express";

export const Logger = (req: Request, res: Response, next): any => {
    console.log(req.ip);
    next()
}