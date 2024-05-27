import { afterAll, beforeAll } from "@jest/globals";
import { User } from "../entities/user";
import { Token } from "../entities/token";
import { appDataSource } from "../database/connectDB";
import { Movie } from "../entities/movie";

beforeAll(async () => {
  await appDataSource.initialize();
});

afterAll(async () => {
  const movieRepository = appDataSource.getRepository(Movie);
  await movieRepository.clear();
  const tokenRepository = appDataSource.getRepository(Token);
  await tokenRepository.clear();
  const userRepository = appDataSource.getRepository(User);
  await userRepository.clear();
});

export const initData = async () => {
  const userRepository = appDataSource.getRepository(User);
  await userRepository.save({
    email: "test_user@gmail.com",
    password: "123",
  });

  const tokenRepository = appDataSource.getRepository(Token);

  const user = await userRepository.findOne({ where: { email: "test_user@gmail.com" } });

  const movieRepository = appDataSource.getRepository(Movie);
  await movieRepository.save({
    title: "test",
    description: "test",
    thumbnail: "test",
    user_id: user.id,
    youtube_id: "test",
  });

  await tokenRepository.save({
    userId: user.id,
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    token: "token-test-1",
  });

  await tokenRepository.save({
    userId: user.id,
    expireAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    token: "token-test-2",
  });
};

export const getMockUserRequest = async () => {
  await initData();
  const userRepo = appDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email: "test_user@gmail.com" } });
  return user;
};
