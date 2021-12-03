import { NextApiHandler } from "next";
import dbConnect from "./mongo";
import verify from "./jwt";
import allowCors from "./cors";

const wrapper = (handler: NextApiHandler) => {
  return dbConnect(allowCors(verify(handler)));
};
export default wrapper;
