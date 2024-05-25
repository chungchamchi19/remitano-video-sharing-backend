import { describe, it, expect, afterAll } from "@jest/globals";
import request from "supertest";
import server from "../..";

describe("Auth", () => {
  afterAll(async () => {
    await server.close();
  });

  describe("POST /api/auth/login", () => {
    it("should return status 400 and require password", async () => {
      const response = await request(server).post("/api/auth/login").send({
        email: "",
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password and Email is required!");
    });

    it("should return status 400 and require email", async () => {
      const response = await request(server).post("/api/auth/login").send({
        password: "",
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password and Email is required!");
    });

    it("should return status 200 and return user", async () => {
      const response = await request(server).post("/api/auth/login").send({
        email: "test@gmail.com",
        password: "123",
      });
      expect(response.status).toBe(200);
      expect(response.body.result.email).toBe("test@gmail.com");
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should return status 200", async () => {
      const response = await request(server).post("/api/auth/logout");
      expect(response.status).toBe(200);
    });
  });
});
