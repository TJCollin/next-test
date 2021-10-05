import mongoose, { Model } from "mongoose";
import { Article } from "../types";

const articleSchema = new mongoose.Schema<Article>(
  {
    title: {
      type: String,
      default: "",
    },
    tags: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Tag",
        },
      ],
    },
    abstract: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
