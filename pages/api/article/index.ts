import type { NextApiRequest, NextApiResponse } from "next";
import wrapper from "../../../middlewares";
import { Methods, ResType } from "../../../types";
import {
  insertArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../../../controller/article";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResType>) => {
  const { method } = req;
  switch (method) {
    case Methods.POST:
      const { title, abstract, tags, content } = req.body;
      try {
        let result = await insertArticle({
          title,
          abstract,
          tags,
          content,
        });
        res.send({ code: 0, data: result, message: "保存文章成功" });
      } catch (e) {
        console.log(e);
        res.send({ code: 1, data: null, message: `保存文章失败：${e}` });
      }
      break;
    case Methods.GET:
      try {
        const { articleId } = req.query;
        if (articleId) {
          let result = await getArticleById(articleId as string);
          res.send({ code: 0, data: result, message: "获取文章成功" });
        } else {
          res.send({ code: 1, data: null, message: "参数缺失" });
        }
      } catch (e) {
        res.send({ code: 1, data: null, message: `获取文章失败: ${e}` });
      }
      break;
    case Methods.PUT:
      try {
        const { _id, title, abstract, tags, content } = req.body;
        if (_id) {
          let result = await updateArticle({
            _id,
            title,
            abstract,
            tags,
            content,
          });
          res.send({ code: 0, data: result, message: "修改文章成功" });
        } else {
          res.send({ code: 1, data: null, message: "参数缺失" });
        }
      } catch (e) {
        res.send({ code: 1, data: null, message: `修改文章失败: ${e}` });
      }
      break;
    case Methods.DELETE:
      try {
        const { articleId } = req.query;
        if (articleId) {
          let result = await deleteArticle(articleId as string);
          res.send({ code: 0, data: result, message: "删除文章成功" });
        } else {
          res.send({ code: 1, data: null, message: "参数缺失" });
        }
      } catch (e) {
        res.send({ code: 1, data: null, message: `删除文章失败: ${e}` });
      }
      break;
  }
};

export const config = {
  bodyParser: false,
};

export default wrapper(handler);
