import { describe, it, expect, jest } from "@jest/globals";
import bcryptjs from "bcryptjs";
import {
  verifyAccessToken,
  hashBcrypt,
  compareBcrypt,
  generateAccessToken,
  generateRefreshToken,
  generateSalt,
} from "../helper";
import userServices from "../auth";

describe("helper", () => {
  it("should return salt when generateSalt", async () => {
    const salt = await generateSalt(10);
    expect(salt).toBe("123");
  });

  it("should return hashed when hashBcrypt", async () => {
    const hashed = await hashBcrypt("123", "123");
    expect(hashed).toBe("123");
  });

  it("should return incorrect when hashBcrypt error", async () => {
    const hashFn = (s: string, hash: string, cb: (err: any, success: boolean) => void) => {
      cb("error", false);
    };
    jest.mocked(bcryptjs.hash).mockImplementation(hashFn as any);
    try {
      await hashBcrypt("123", "123");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  it("should return correct when compareBcrypt", async () => {
    const isCorrect = await compareBcrypt("123", "123");
    expect(isCorrect).toBe(true);
  });

  it("should return incorrect when compareBcrypt error", async () => {
    const compareFn = (s: string, hash: string, cb: (err: any, success: boolean) => void) => {
      cb("error", false);
    };
    jest.mocked(bcryptjs.compare).mockImplementation(compareFn as any);
    try {
      await compareBcrypt("123", "123");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  it("should return access token when generateAccessToken", async () => {
    const accessToken = await generateAccessToken(1);
    expect(accessToken).toBe("123");
  });

  it("should return refresh token when generateRefreshToken", async () => {
    const refreshToken = await generateRefreshToken(1);
    expect(refreshToken).toBe("123");
  });

  it("should return user when verify access token successfully", async () => {
    // @ts-ignore
    userServices.findUserWithOr = jest.fn().mockReturnValue({ id: 1 });
    const user = await verifyAccessToken("123");
    expect(user).toEqual({ id: 1 });
  });
});

jest.mock("bcryptjs", () => {
  return {
    genSaltSync: jest.fn().mockReturnValue("123"),
    hash: jest.fn().mockImplementation((text, salt, cb: any) => {
      cb(null, "123");
    }),
    compare: jest.fn().mockImplementation((text, salt, cb: any) => {
      cb(null, true);
    }),
  };
});

jest.mock("jsonwebtoken", () => {
  return {
    verify: jest.fn().mockReturnValue({ userId: 1 }),
    sign: jest.fn().mockReturnValue("123"),
  };
});
