import ProjectModel from "../models/project";
import { Project } from "../types";

export const insertProject = async (project: Project) => {
  try {
    let findOne = await ProjectModel.find({ projectName: project.projectName });
    let res;
    if (findOne.length > 0) {
      res = await ProjectModel.updateOne({ _id: findOne[0]._id }, project);
    } else {
      res = await new ProjectModel(project).save();
    }
    return res;
  } catch (e) {
    return e;
  }
};

export const deleteProject = async (id: string) => {
  let res = await ProjectModel.findByIdAndRemove(id);
  return res;
};

export const getProjectListByPage = async (page: number | null) => {
  let pipelineArr: any[] = [{ $skip: 0 }];
  if (page) {
    pipelineArr.push({ $skip: 10 * (page - 1) }, { $limit: 10 });
  }
  let res_limit = await ProjectModel.aggregate(pipelineArr);
  let total = await ProjectModel.countDocuments();

  return { total: total, res_limit: res_limit };
};
