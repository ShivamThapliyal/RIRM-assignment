import mongoose from "mongoose";
import bycrpt from "bcrypt";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { minimize: false }
);

const UserModel = mongoose.model.user || mongoose.model("User", UserSchema);
export default UserModel;
