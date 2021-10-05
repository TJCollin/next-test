import type { NextApiRequest, NextApiResponse } from "next";
import { findOne } from "../../../controller/user";
import dbConnect from "../../../middlewares/mongo";
import UserModel from "../../../models/user";
import { Methods, ResType } from "../../../types";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResType>) => {
  const { method } = req;
  switch (method) {
    case Methods.POST:
      const { username, password } = req.body;
      const secret = process.env.SECRET;
      if (!secret) {
        throw new Error("请在环境参数中配置 JWT 密钥");
      }
      if (username && password) {
        const user = await findOne(username);
        if (user && user.password === password) {
          const token = jwt.sign(
            {
              name: user.name,
              password: user.password,
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            },
            secret
          );
          res.send({ code: 0, data: { token, user }, message: "登录成功" });
        } else {
          res.send({ code: 1, data: null, message: "密码错误" });
        }
      } else {
        res.send({ code: 1, message: "用户名和密码不为空", data: null });
      }
      break;
  }
};

export default dbConnect(handler);
