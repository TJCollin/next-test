import { Mongoose } from "mongoose";

export interface User {
  // 名字
  name: string;

  username?: string;

  // 签名
  slogan?: string;

  // 头像
  gravatar?: string;

  // 密码
  password: string;

  // role
  role: number;
}

export interface MongoCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
