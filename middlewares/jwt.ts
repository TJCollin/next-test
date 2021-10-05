import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ResType } from "../types";
import jwt, { JwtPayload } from "jsonwebtoken";
const verify =
  (handler: NextApiHandler) =>
  (req: NextApiRequest, res: NextApiResponse<ResType>) => {
    let secret = process.env.SECRET!;

    if (!secret) {
      throw new Error("请在环境参数中配置 JWT 密钥");
    }

    const { authorization } = req.headers;
    if (authorization && authorization.indexOf("Basic ") > -1) {
      const base64Credentials = authorization.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii"
      );
      const [username, token] = credentials.split(":");

      if (username && token) {
        try {
          const { exp } = jwt.verify(token, secret) as JwtPayload;
          if (exp && exp > Math.floor(Date.now() / 1000)) {
            return handler(req, res);
          } else {
            res.send({ code: 1, data: null, message: "token 过期" });
          }
        } catch (e) {
          res.send({ code: 1, data: null, message: "token 无效" });
        }
      }
    } else {
      res.send({ code: 1, data: null, message: "未登录" });
    }
  };

export default verify;
