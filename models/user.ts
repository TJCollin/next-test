import mongoose, { Schema, model, Model } from "mongoose";
import { User } from "../types";

const userSchema = new Schema<User>({
  // 名字
  name: { type: String, default: "collin" },

  username: {
    type: String,
    default: process.env.defaultUsername,
  },

  // 签名
  slogan: { type: String, default: "" },

  // 头像
  gravatar: { type: String, default: "" },

  // 密码
  password: {
    type: String,
    default: process.env.defaultPassword,
  },

  // role
  role: { type: Number, default: 1 },
});

export default mongoose.models.User as Model<User> || model("User", userSchema);
