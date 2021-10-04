import mongoose, { connect } from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { MongoCache } from "../types";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
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
      // Use current db connection
      return handler(req, res);
    }
    await connect(uri);
    return handler(req, res);
  };

export default dbConnect;
