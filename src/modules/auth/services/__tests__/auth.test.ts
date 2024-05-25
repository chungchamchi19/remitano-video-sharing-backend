import { describe, it, expect, jest, afterAll } from "@jest/globals";
import authServices from "../auth";
import { initData } from "../../../../tests/setup";
import CustomError from "../../../../errors/customError";

describe("auth service", () => {
  describe("createUser", () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    it("should return a new user when email is not in the database", async () => {
      const user = await authServices.createUser({
        email: "test_user@gmail.com",
        password: "123",
      });
      expect(user.email).toBe("test_user@gmail.com");
      expect(user.password).toBe("123");
    });

    it("should return the user when user is already in the database", async () => {
      const user = await authServices.createUser({
        email: "test_user@gmail.com",
        password: "123",
      });
      expect(user.email).toBe("test_user@gmail.com");
      expect(user.password).toBe("123");
    });

    it("should not return user when missing email", async () => {
      try {
        await authServices.createUser({
          email: null,
          password: "123",
        });
      } catch (error) {
        expect((error as CustomError).code).toBe(400);
        expect((error as CustomError).message).toBe("Password and Email is required!");
      }
    });

    it("should return not found error when missing password", async () => {
      try {
        await authServices.createUser({
          email: "test_user@gmail.com",
          password: null,
        });
      } catch (error) {
        expect((error as CustomError).code).toBe(400);
        expect((error as CustomError).message).toBe("Password and Email is required!");
      }
    });

    it("should return unauthorized error when password incorrect", async () => {
      try {
        await authServices.createUser({
          email: "test_user@gmail.com",
          password: "12322222",
        });
      } catch (error) {
        expect((error as CustomError).code).toBe(403);
        expect((error as CustomError).message).toBe("Password incorrect!");
      }
    });
  });

  describe("findUserWithOr", () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    it("should not return any user when email not exist", async () => {
      const user = await authServices.findUserWithOr({ email: "1111", password: "" });
      expect(user).toBeNull();
    });

    it("should return the user when email and password correct", async () => {
      await initData();
      const user = await authServices.findUserWithOr({ email: "test_user@gmail.com", password: "123" });
      expect(user.email).toBe("test_user@gmail.com");
    });
  });
});

jest.mock("../helper", () => {
  return {
    hashBcrypt: jest.fn().mockReturnValue("123"),
    generateSalt: jest.fn().mockReturnValue("123"),
    compareBcrypt: jest.fn().mockReturnValue(true),
  };
});
