import ArticleModel from "../models/article";
import { Article } from "../types";
import { Types } from "mongoose";
export const insertArticle = async (article: Article) => {
  let res = await new ArticleModel(article).save();
  return res;
};

export const deleteArticle = async (articleId: string) => {
  return ArticleModel.findByIdAndRemove(articleId);
};

export const updateArticle = async (article: Article) => {
  return await ArticleModel.updateOne({ _id: article._id }, article);
};

export const getArticleById = async (articleId: string) => {
  let id = new Types.ObjectId(articleId);
  let pipelineArr: any[] = [
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "tagArr",
      },
    },
    {
      $project: {
        title: 1,
        _id: 1,
        abstract: 1,
        tagArr: 1,
        tags: 1,
        content: 1,
        updatedAt: {
          $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$updatedAt" },
        },
      },
    },
  ];
  return await ArticleModel.aggregate(pipelineArr);
};

export const getArticleListByPage = async (
  page: number | null,
  keywords: string
) => {
  // let res_limit = await ArticleModel.find()
  const keywordsReg = new RegExp(keywords, "i");
  let pipelineArr: any[] = [
    {
      $sort: {
        updatedAt: -1,
      },
    },
    {
      $match: {
        $or: [
          {
            title: { $regex: keywordsReg },
          },
          {
            abstract: { $regex: keywordsReg },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "tagArr",
      },
    },
    {
      $project: {
        title: 1,
        _id: 1,
        abstract: 1,
        tagArr: 1,
        updatedAt: {
          $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$updatedAt" },
        },
      },
    },
  ];
  if (page) {
    pipelineArr.push({ $skip: 10 * (page - 1) }, { $limit: 10 });
  }
  let res_limit = await ArticleModel.aggregate(pipelineArr);
  let total = await ArticleModel.countDocuments();
  return { total: total, res_limit: res_limit };
};
