import { NextFunction, Request, Response } from "express";

const ERRORS = {
  unauthorized: 401,
  NotFound: 404,
};

export default function errorHandler(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  const type: string = err.type;
  let statusCode = ERRORS[type];
  if (!statusCode) {
    statusCode = 500;
  }
  return res.status(statusCode).send(err.message);
}
