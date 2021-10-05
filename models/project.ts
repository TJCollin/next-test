import mongoose, { Model } from "mongoose";
import { Project } from "../types";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    unique: true,
    default: "",
  },
  projectDesc: {
    type: String,
    default: "",
  },
  projectUrl: {
    type: String,
    default: "",
  },
  projectCode: {
    type: String,
    default: "",
  },
  projectIcon: {
    type: String,
    default: "",
  },
});

export default (mongoose.models.Project as Model<Project>) ||
  mongoose.model("Project", projectSchema);
