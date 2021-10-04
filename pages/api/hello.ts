// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../middlewares/mongo";
import UserModel from "../../models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await UserModel.find({}).limit(10);
  res.status(200).json({ data: users });
};

export default dbConnect(handler);
