import UserModel from "../models/user";
import { User } from "../types";

/**
 * 根据用户名查询单个用户
 * @param {用户名} username
 */
export const findOne = async (username: string) => {
  return await UserModel.findOne({ username }).exec();
};

export const updateOne = async (user: User) => {
  const findOne = await UserModel.find({ username: user.username }).exec();
  let res;
  if (findOne.length > 1) {
    res = await UserModel.updateOne({ username: user.username }, user);
  } else {
    res = await new UserModel(user).save();
  }
  return res;
};
