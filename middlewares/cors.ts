import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const allowCors =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");

    console.log(
      "origin",
      req.headers.origin,
      req.method,
      req.headers.origin?.includes("localhost")
    );

    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    console.log(req.method, req.method === "OPTIONS");
    if (req.method === "OPTIONS") {
      console.log("options");
      res.status(200).send({});
    } else {
      return await handler(req, res);
    }
  };

export default allowCors;
