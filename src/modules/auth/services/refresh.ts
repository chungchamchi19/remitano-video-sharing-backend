import { appDataSource } from "../../../database/connectDB";
import { Token } from "../../../entities/token";
import codes from "../../../errors/codes";
import CustomError from "../../../errors/customError";
import { generateAccessToken } from "./helper";

export const getNewAccessTokenFromRefreshToken = async (token: string) => {
  const tokenRepo = appDataSource.getRepository(Token);
  const findToken = await tokenRepo.findOne({ where: { token } });
  if (!findToken) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  if (new Date(findToken.expireAt).getTime() < Date.now()) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  const newAccessToken = await generateAccessToken(findToken.userId);
  return newAccessToken;
};

export const deleteRefreshToken = async (token: string) => {
  const tokenRepo = appDataSource.getRepository(Token);
  const findToken = await tokenRepo.findOne({ where: { token } });
  if (!findToken) {
    return;
  }
  await tokenRepo.delete(findToken.id);
};
