import authService from "../services/auth";
import { Request, Response } from "express";
import CustomError from "../../../errors/customError";
import codes from "../../../errors/codes";
import { getNewAccessTokenFromRefreshToken, deleteRefreshToken } from "../services/refresh";
import configs from "../../../configs";
import { generateAccessToken, generateRefreshToken } from "../services/helper";

const login = async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);
  const token = await generateAccessToken(user?.id);
  const refreshToken = await generateRefreshToken(user?.id);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: configs.TIME_REFRESH_TOKEN_EXPIRE,
  });
  delete user?.password;
  return res.status(200).json({
    status: "success",
    result: {
      ...user,
      token,
    },
  });
};

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new CustomError(codes.BAD_REQUEST, "No refresh token!");
  }
  const accessToken = await getNewAccessTokenFromRefreshToken(refreshToken);
  return res.status(200).json({
    status: "success",
    result: {
      token: accessToken,
    },
  });
};

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(200).json({
      status: "success",
      result: "Logout success!",
    });
  }
  await deleteRefreshToken(refreshToken);
  return res.status(200).json({
    status: "success",
    result: "Logout success!",
  });
};

export default {
  login,
  refreshToken,
  logout,
};
