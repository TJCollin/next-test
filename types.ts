import { Mongoose, Types } from "mongoose";

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

export const Methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export interface ResType {
  code: number;
  message?: string;
  data: any;
}

export interface Tag {
  tagName: string;
  description?: string;
}

export interface Article {
  title: string;
  tags?: string[];
  abstract?: string;
  content?: string;
  _id?: string;
}

export interface Project {
  projectName: string;
  projectDesc?: string;
  projectUrl?: string;
  projectCode?: string;
  projectIcon?: string;
}
