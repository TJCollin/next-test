import { Tag } from "../types";

import TagModel from "../models/tag";
import ArticleModel from "../models/article";
import { Types } from "mongoose";
export const updateTag = async (tag: Tag) => {
  const findOne = await TagModel.find({ tagName: tag.tagName }).exec();
  let res;
  if (findOne.length > 1) {
    res = await TagModel.updateOne({ _id: findOne[0]._id }, tag);
  } else {
    res = await new TagModel(tag).save();
  }
  return res;
};

export const getTagListByPage = async (page: number | null) => {
  let pipelineArr: any[] = [{ $skip: 0 }];
  if (page) {
    pipelineArr.push({ $skip: 10 * (page - 1) }, { $limit: 10 });
  }
  let res_limit = await TagModel.aggregate(pipelineArr);
  let total = await TagModel.countDocuments();
  return { total: total, res_limit: res_limit };
};

export const deleteTag = async (tagId: string) => {
  await ArticleModel.updateMany(
    { tags: new Types.ObjectId(tagId) },
    { $pull: { tags: new Types.ObjectId(tagId) } }
  );

  return TagModel.findByIdAndRemove(tagId);
};
