import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import getDataUrl from "../utils/urlGenerater.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    const file = req.file;
    if (!name || !email || !password || !gender || !file) {
      return res.status(404).json({
        message: "All Fields required!",
      });
    }

    let user = await User.findOne({ email });
    if (user)
      return res.status.json({
        message: "User Already exist !!",
      });
    // file url
    const fileUrl = getDataUrl(file);

    const hashPassword = await bcrypt.hash(password, 10);

    const myCloud = await cloudinary.v2.uploader.upload(fileUrl, content);

    user = await User.create({
      name,
      email,
      password: hashPassword,
      gender,
      profilePic: {
        id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    generateToken(user._id, res);
    res.status(200).json({
      message: "User Register Successfully !",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: `errror yaha hai ${error.message}` });
  }
};
