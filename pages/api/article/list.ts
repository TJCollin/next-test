import type { NextApiRequest, NextApiResponse } from "next";
import wrapper from "../../../middlewares";
import { Methods, ResType } from "../../../types";
import { getArticleListByPage } from "../../../service/article";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResType>) => {
  const { method } = req;
  switch (method) {
    case Methods.GET:
      try {
        const { page = 0, keywords = "" } = req.query;
        const result = await getArticleListByPage(
          page as number,
          keywords as string
        );
        res.send({ code: 0, data: result, message: "获取文章列表成功" });
      } catch (e) {
        res.send({ code: 1, data: null, message: `获取文章列表失败：${e}` });
      }
      break;
  }
};

export default wrapper(handler);
