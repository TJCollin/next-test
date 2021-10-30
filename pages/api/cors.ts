import { NextApiRequest, NextApiResponse } from "next";
import serve from "serve-handler";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await serve(req, res, {
    headers: [
      {
        source: "**/*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:8080",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ],
  });
  res.json({ data: "hello" });
};

export default handler;
