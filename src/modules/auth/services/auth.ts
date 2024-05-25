import { User } from "../../../entities/user";
import { makeDataUpdate } from "../../../utils/makeDataUpdate";
import { generateSalt, hashBcrypt, compareBcrypt } from "./helper";
import CustomError from "../../../errors/customError";
import codes from "../../../errors/codes";
import { appDataSource } from "../../../database/connectDB";

const createUser = async (dataRegister: User) => {
  if (!dataRegister.email || !dataRegister.password) {
    throw new CustomError(codes.BAD_REQUEST, "Password and Email is required!");
  }
  const userRepository = appDataSource.getRepository(User);
  const data = { ...dataRegister, password: await hashBcrypt(dataRegister.password, generateSalt(10)) };
  let user = makeDataUpdate(data) as User;
  const validUser = await findUserWithOr({ email: user.email });
  if (validUser) {
    const comparePassword = await compareBcrypt(dataRegister.password, validUser.password);
    if (!comparePassword) {
      throw new CustomError(codes.FORBIDDEN, "Password incorrect!");
    }
    return validUser;
  }
  return await userRepository.save(user);
};

const findUserWithOr = async (user: User) => {
  const userRepository = appDataSource.getRepository(User);
  let key: keyof User;
  let query = userRepository.createQueryBuilder("u");
  for (key in user) {
    if (user[key]) {
      query.orWhere(`u.${key} = :${key}`, { [key]: user[key] });
    }
  }
  return await query.getOne();
};

export default { createUser, findUserWithOr };
