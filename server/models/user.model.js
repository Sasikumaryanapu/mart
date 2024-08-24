import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
  },
  {
    timestaps: true,
    collection: "users",
    strict: false,
    versionKey:false,
  }
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
