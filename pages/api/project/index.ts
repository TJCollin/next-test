import type { NextApiRequest, NextApiResponse } from "next";
import wrapper from "../../../middlewares";
import { Methods, ResType } from "../../../types";
import {
  insertProject,
  getProjectListByPage,
  deleteProject,
} from "../../../service/project";

const handler = async (req: NextApiRequest, res: NextApiResponse<ResType>) => {
  const { method } = req;
  switch (method) {
    case Methods.POST:
      try {
        const {
          projectName,
          projectDesc,
          projectUrl,
          projectCode,
          projectIcon,
        } = req.body;
        const result = await insertProject({
          projectName,
          projectDesc,
          projectUrl,
          projectCode,
          projectIcon,
        });
        res.send({ code: 0, data: result, message: "新增项目成功" });
      } catch (e) {
        res.send({ code: 1, data: null, message: `新增项目失败：${e}` });
      }
      break;
    case Methods.GET:
      try {
        let { page = 0 } = req.query;
        let result = await getProjectListByPage(page as number);
        res.send({ code: 0, data: result, message: "获取项目成功" });
      } catch (e) {
        res.send({ code: 1, data: null, message: `获取项目失败：${e}` });
      }
      break;
    case Methods.DELETE:
      try {
        const { projectId } = req.query;
        if (projectId) {
          let result = await deleteProject(projectId as string);
          res.send({ code: 0, data: result, message: "删除项目成功" });
        } else {
          res.send({ code: 1, data: null, message: "参数缺失" });
        }
      } catch (e) {
        res.send({ code: 1, data: null, message: `删除项目失败：${e}` });
      }
      break;
  }
};

export default wrapper(handler);
