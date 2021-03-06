import mongoose, { connect } from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { MongoCache } from "../types";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("请在环境参数中配置 Mongo URI");
}

//   @ts-ignore
let cached: MongoCache = global.mongoose;

if (!cached) {
  //   @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      console.log("使用已有数据库连接！");
      return handler(req, res);
    }
    try {
      console.log("连接数据库成功！");
      await connect(uri);
      return handler(req, res);
    } catch (e) {
      console.log("e");
      res.send({ code: 1, data: null, message: "数据库连接失败" });
    }
  };

export default dbConnect;
