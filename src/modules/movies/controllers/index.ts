import { Movie } from "../../../entities/movie";
import codes from "../../../errors/codes";
import CustomError from "../../../errors/customError";
import { SORTBY } from "../../../types/type.filter";
import movieService from "../services/movie";
import { Request, Response } from "express";

const getMovies = async (req: Request, res: Response) => {
  const { lastMovieId, pageSize, orderBy } = req.query;
  const movie = await movieService.getMovies({
    pageSize: Number(pageSize),
    orderBy: orderBy as SORTBY,
    lastMovieId: Number(lastMovieId),
  });
  return res.status(200).json({
    status: "success",
    result: movie,
  });
};

const shareMovie = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  const body: Movie = {
    ...req.body,
    user_id: userId,
  };
  const movie = await movieService.createMovie(body);
  //@ts-ignore
  global.io.emit("share-movie", {
    ...movie,
    user: {
      email: req.user.email,
    },
  });
  return res.status(200).json({
    status: "success",
    result: movie,
  });
};

export default {
  getMovies,
  shareMovie,
};
