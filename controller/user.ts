import UserModel from "../models/user";

/**
 * 根据用户名查询单个用户
 * @param {用户名} username
 */
export const findOne = async (username: string) => {
  return await UserModel.findOne({ username }).exec();
};
