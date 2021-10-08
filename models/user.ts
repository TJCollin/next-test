import mongoose, { Schema, model, Model } from "mongoose";
import { User } from "../types";

const userSchema = new Schema<User>({
  // 名字
  username: {
    type: String,
  },

  // 签名
  slogan: { type: String, default: "" },

  // 头像
  avatar: { type: String, default: "" },

  // 密码
  password: {
    type: String,
  },

  // role
  role: { type: Number, default: 1 },
});

export default (mongoose.models.User as Model<User>) ||
  model("User", userSchema);
