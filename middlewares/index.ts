import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./mongo";
import verify from "./jwt";

const wrapper = (handler: NextApiHandler) => dbConnect(verify(handler));

export default wrapper;
