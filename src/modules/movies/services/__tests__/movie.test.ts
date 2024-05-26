import { describe, it, expect, jest, afterAll } from "@jest/globals";
import movieService from "../movie";
import { getMockUserRequest, initData } from "../../../../tests/setup";

describe("movieService", () => {
  describe("createMovie", () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    it("should return a movie when create", async () => {
      await initData();
      const mockUser = await getMockUserRequest();
      const movie = await movieService.createMovie({
        title: "test",
        description: "test",
        thumbnail: "test",
        user_id: mockUser.id,
        youtube_id: "test",
      });
      expect(movie.title).toBe("test");
      expect(movie.description).toBe("test");
      expect(movie.youtube_id).toBe("test");
    });

    it("should not return a movie when missing youtube_id", async () => {
      try {
        await movieService.createMovie({
          title: null,
          description: "test",
          thumbnail: "test",
          user_id: 1,
          youtube_id: null,
        });
      } catch (error: any) {
        expect(error.message).toBe("Youtube id is required!");
      }
    });
  });

  describe("getMovies", () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    it("should return movies when params has not lastMovieId", async () => {
      const movies = await movieService.getMovies({ pageSize: 10, orderBy: "DESC" });
      expect(movies).not.toBe(undefined);
    });

    it("should return movies when params has lastMovieId", async () => {
      const movies = await movieService.getMovies({ pageSize: 10, lastMovieId: 1, orderBy: "DESC" });
      expect(movies).not.toBe(undefined);
    });
  });
});
