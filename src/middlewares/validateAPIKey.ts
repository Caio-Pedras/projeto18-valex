import {NextFunction, Request, Response} from "express"

export function  APIKeyValidator (req: Request, res:Response, next:NextFunction){
    const APIKey: string = req.headers["x-api-key"].toString();

    if(!APIKey){
        throw{type:"notFound", message:"api key dosent exist"}
    }
    next();
}