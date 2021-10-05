import mongoose, { Model } from "mongoose";
import { Tag } from "../types";

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    default: "",
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
});

export default (mongoose.models.Tag as Model<Tag>) ||
  mongoose.model("Tag", tagSchema);
