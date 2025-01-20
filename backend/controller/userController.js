import UserModel from "../models/userModel.js";
import bycrpt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Sign-up
const createUser = async (req, res) => {
  const { name, password } = req.body;
  //checking if already user exist
  try {
    const exist = await UserModel.findOne({ name });
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }

    if (password.length < 3) {
      return res.json({
        success: false,
        message: "Enter password lenght of 3",
      });
    }
    //encrypt the password
    const salt = await bycrpt.genSalt(10);
    const encryptPassword = await bycrpt.hash(password, salt);
    const newUser = new UserModel({
      name: name,
      password: encryptPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//log-in
const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.json({ success: false, message: "User Does't exist" });
    }

    const isMatch = await bycrpt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { createUser, login };
