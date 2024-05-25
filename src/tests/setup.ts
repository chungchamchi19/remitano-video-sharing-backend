import { afterAll, beforeAll } from "@jest/globals";
import { User } from "../entities/user";
import { Token } from "../entities/token";
import { appDataSource } from "../database/connectDB";

beforeAll(async () => {
  await appDataSource.initialize();
});

afterAll(async () => {
  const userRepository = appDataSource.getRepository(User);
  await userRepository.clear();
  const tokenRepository = appDataSource.getRepository(Token);
  await tokenRepository.clear();
});

export const initData = async () => {
  const userRepository = appDataSource.getRepository(User);
  await userRepository.save({
    email: "test_user@gmail.com",
    password: "12322222",
  });

  const tokenRepository = appDataSource.getRepository(Token);

  const user = await userRepository.findOne({ where: { email: "test_user@gmail.com" } });

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
