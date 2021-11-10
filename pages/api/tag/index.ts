import type { NextApiRequest, NextApiResponse } from "next";
import wrapper from "../../../middlewares";
import { Methods, ResType } from "../../../types";
import { getTagListByPage, updateTag, deleteTag } from "../../../service/tag";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResType>) => {
  const { method } = req;
  switch (method) {
    case Methods.POST:
      try {
        const { tagName, description } = req.body;
        const result = await updateTag({ tagName, description });
        res.send({ code: 0, data: result, message: "新增修改成功" });
      } catch (e) {
        res.send({ code: 1, data: null, message: `新增标签失败：${e}` });
      }
      break;
    case Methods.GET:
      try {
        const page = Number(req.query.page) || 0;
        let result = await getTagListByPage(page);
        res.send({ code: 0, data: result, message: "获取标签成功" });
      } catch (e) {
        res.send({ code: 1, data: null, message: `获取标签失败：${e}` });
      }
      break;
    case Methods.DELETE:
      try {
        const { tagId } = req.query;
        if (tagId) {
          let result = await deleteTag(tagId as string);
          res.send({ code: 0, data: result, message: "删除标签成功" });
        } else {
          res.send({ code: 1, data: null, message: "参数缺失" });
        }
      } catch (e) {
        res.send({ code: 1, data: null, message: `删除标签失败：${e}` });
      }
      break;
    case Methods.DELETE:
  }
};

export default wrapper(handler);
