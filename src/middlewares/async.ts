import { NextFunction, Request, Response } from "express";

const asyncMiddleware = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (e: any) {
      errorHandler(e, req, res);
    }
  };
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (
  err: { code: number; statusCode: number; details: any; message: any },
  req: Request,
  res: Response,
) => {
  let statusCode = Number(err.code) || Number(err.statusCode) || 400;
  let { message } = err;
  let details;
  return res.status(statusCode).json({
    status: "fail",
    message: message,
    statusCode: statusCode,
    details: details,
  });
};

export default asyncMiddleware;
