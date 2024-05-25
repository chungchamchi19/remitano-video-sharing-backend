import { NextFunction, Request, Response } from "express";
import codes from "../errors/codes";
import CustomError from "../errors/customError";
import { verifyAccessToken } from "../modules/auth/services/helper";

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  if (apiCheckAuth(req.path)) {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError(codes.UNAUTHORIZED);
    const [tokenType, accessToken] = authorization.split(" ");
    if (tokenType !== "Bearer") throw new CustomError(codes.UNAUTHORIZED);
    const user = await verifyAccessToken(accessToken);
    if (!user) throw new CustomError(codes.UNAUTHORIZED);
    req.user = user;
    if (["/auth/logout", "/auth/verify"].includes(req.path)) {
      req.accessToken = accessToken;
    }
  }

  return next();
};

const apiCheckAuth = (path: string) => {
  if (!path.includes("auth") && !path.includes("public")) {
    return true;
  }
  return false;
};

export default authMiddleware;
