import { describe, it, expect, jest, beforeEach, afterAll } from "@jest/globals";
import authControllers from "..";
import { res } from "../../../../tests/mock";
import { Request } from "express";
import authService from "../../services/auth";
import server from "../../../..";
import CustomError from "../../../../errors/customError";

describe("auth controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await server.close();
  });

  describe("login", () => {
    it("should return status 200 and user information when create user success", async () => {
      const req = {
        body: {
          email: "test@gmail.com",
          password: "123",
        },
      } as Request;
      jest.mocked(authService.createUser).mockReturnValue({
        id: 1,
        email: req.body.email,
      } as any);
      await authControllers.login(req, res);
      expect(res.status(200).json).toHaveBeenCalledWith({
        status: "success",
        result: {
          id: 1,
          email: "test@gmail.com",
          token: "abcdef",
        },
      });
    });
  });

  describe("refreshToken", () => {
    it("should return status 200 and user information when refresh token success", async () => {
      const req = {
        cookies: {
          refreshToken: "test@gmail.com",
        },
      } as Request;
      await authControllers.refreshToken(req, res);
      expect(res.status(200).json).toHaveBeenCalledWith({
        status: "success",
        result: {
          token: "abcdef",
        },
      });
    });

    it("should return status 400 when refresh token not found", async () => {
      const req = {
        cookies: {},
      } as Request;
      try {
        await authControllers.refreshToken(req, res);
      } catch (error) {
        expect((error as CustomError).message).toBe("No refresh token!");
        expect((error as CustomError).code).toBe(400);
      }
    });
  });

  describe("logout", () => {
    it("should return status 200 when logout successfully", async () => {
      const req = {
        cookies: {
          refreshToken: "123",
        },
      } as Request;
      await authControllers.logout(req, res);
      expect(res.status(200).json).toHaveBeenCalledWith({
        status: "success",
        result: "Logout success!",
      });
    });
  });
});

jest.mock("../../services/auth", () => {
  return {
    createUser: jest.fn(),
  };
});

jest.mock("../../services/refresh", () => {
  return {
    getNewAccessTokenFromRefreshToken: jest.fn().mockReturnValue("abcdef"),
    deleteRefreshToken: jest.fn(),
  };
});

jest.mock("../../services/helper", () => {
  return {
    generateAccessToken: jest.fn().mockReturnValue("abcdef"),
    generateRefreshToken: jest.fn(),
    hashBcrypt: jest.fn().mockReturnValue("123"),
    generateSalt: jest.fn().mockReturnValue("123"),
    compareBcrypt: jest.fn().mockReturnValue(true),
  };
});
