import { describe, it, expect, afterAll, jest } from "@jest/globals";
import request from "supertest";
import server from "../..";
import { getMockUserRequest } from "../../tests/setup";
import { verifyAccessToken } from "../../modules/auth/services/helper";

jest.mock("../../modules/auth/services/helper", () => {
  return {
    verifyAccessToken: jest.fn().mockReturnValue({ id: 1 }),
    hashBcrypt: jest.fn().mockReturnValue("123"),
    generateSalt: jest.fn().mockReturnValue("123"),
    compareBcrypt: jest.fn().mockReturnValue(true),
  };
});

describe("Movie", () => {
  afterAll(async () => {
    await server.close();
  });

  describe("GET /api/public/movies", () => {
    it("should return status 200 and return movies", async () => {
      const response = await request(server).get("/api/public/movies");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: "success", result: [] });
    });
  });

  describe("POST /api/movies", () => {
    it("should return status 200 and the movie detail", async () => {
      const mockUser = await getMockUserRequest();
      jest.mocked(verifyAccessToken).mockReturnValue(mockUser as any);
      const response = await request(server).post("/api/movies").set("authorization", "Bearer abs").send({
        title: "test",
        description: "test",
        youtube_id: "test",
        thumbnail: "",
      });
      delete response.body?.result?.id;
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        result: {
          title: "test",
          description: "test",
          youtube_id: "test",
          user_id: mockUser.id,
          thumbnail: "",
          createdAt: null,
          updatedAt: null,
        },
      });
    });
  });
});
