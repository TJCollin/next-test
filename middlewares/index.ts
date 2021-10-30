import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./mongo";
import verify from "./jwt";
import allowCors from "./cors";

const wrapper = (handler: NextApiHandler) =>
  dbConnect(allowCors(verify(handler)));

export default wrapper;
