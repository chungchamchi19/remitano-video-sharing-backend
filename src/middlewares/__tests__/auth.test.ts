import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import authMiddleware from "../auth";
import { res } from "../../tests/mock";
import CustomError from "../../errors/customError";

describe("auth middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return unauthorized when token is invalid", async () => {
    try {
      const req = {
        headers: {
          authorization: "",
        },
        path: "",
      } as any;
      const next = jest.fn();
      await authMiddleware(req, res, next);
    } catch (error) {
      expect((error as CustomError).code).toBe(401);
      expect((error as CustomError).message).toBe("Unauthorized");
    }
  });

  it("should call next function when token is valid", async () => {
    const req = {
      headers: {
        authorization: "Bearer xyz",
      },
      path: "",
    } as any;
    const next = jest.fn();
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should call next function when path is auth", async () => {
    const req = {
      headers: {
        authorization: "Bearer xyz",
      },
      path: "/auth",
    } as any;
    const next = jest.fn();
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should call next function when path is public", async () => {
    const req = {
      headers: {
        authorization: "Bearer xyz",
      },
      path: "/public",
    } as any;
    const next = jest.fn();
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

jest.mock("../../modules/auth/services/helper", () => {
  return {
    generateAccessToken: jest.fn().mockReturnValue("abcdef"),
    generateRefreshToken: jest.fn(),
    hashBcrypt: jest.fn().mockReturnValue("123"),
    generateSalt: jest.fn().mockReturnValue("123"),
    compareBcrypt: jest.fn().mockReturnValue(true),
    verifyAccessToken: jest.fn().mockReturnValue({ id: 1 }),
  };
});
