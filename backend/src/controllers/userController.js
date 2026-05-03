// External Modules :-
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// Local Modules :-
import userModel from "../models/userModel.js";
import { JWT_SECRET } from "../config/envConfig.js";


// Controller to signup a user :-
export async function signup(req, res) {
  const { fullName, email, password, bio } = req.body;
  console.log(fullName, email, password, bio);

  try {
    if (!fullName || !email || !password || !bio) {
      return res.status(401).json({
        success: false,
        message: "Missing details",
      });
    }

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }

    const hPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ fullName, email, password: hPassword, bio }); // prettier-ignore
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(200).json({ success: true, user, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}

// Controller to login a user
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.status(200).json({
      success: true,
      user,
      token,
      message: "Logged In successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}

// Controller to check if the user is authenticated :-
export async function checkAuth(req, res) {
  res.status(200).json({ success: true, user: req.user });
}

// Controller to update user profile details :-
export async function updateProfile(req, res) {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true },
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await userModel.findByIdAndUpdate(userId, {
        profilePic: upload.secure_url, bio, fullName
      }, { new: true }); // prettier-ignore
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}
