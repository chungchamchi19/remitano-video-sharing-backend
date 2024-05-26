import { appDataSource } from "./../../../database/connectDB";
import { Movie } from "../../../entities/movie";
import { SORTBY } from "../../../types/type.filter";
import config from "../../../configs";
import CustomError from "../../../errors/customError";
import codes from "../../../errors/codes";
import { makeDataUpdate } from "../../../utils/makeDataUpdate";

const getMovies = async (filter: { pageSize: number; lastMovieId?: number; orderBy: SORTBY }) => {
  const { lastMovieId, pageSize, orderBy } = filter;
  const movieRepository = appDataSource.getRepository(Movie);
  const query = movieRepository.createQueryBuilder("m");
  query.select(["m.id", "m.title", "m.description", "m.thumbnail", "m.youtube_id", "m.createdAt", "m.updatedAt"]);
  if (lastMovieId) {
    query.andWhere("m.id < :lastMovieId", { lastMovieId });
  }
  query.leftJoinAndSelect("m.user", "u");
  query.orderBy("m.createdAt", orderBy);
  query.limit(pageSize || config.MAX_RECORDS_PER_REQ);
  return await query.getMany();
};

const createMovie = async (movieData: Movie) => {
  if (!movieData.youtube_id) {
    throw new CustomError(codes.BAD_REQUEST, "Youtube id is required!");
  }
  const movieRepository = appDataSource.getRepository(Movie);
  const movie = makeDataUpdate(movieData) as Movie;
  return await movieRepository.save(movie);
};

export default {
  createMovie,
  getMovies,
};
