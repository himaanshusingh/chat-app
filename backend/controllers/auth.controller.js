import genarateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const checkByUsername = await User.findOne({ userName });
    if (checkByUsername) {
      return res.status(400).json({ Message: "username already exist" });
    }
    const checkByEmail = await User.findOne({ email });
    if (checkByEmail) {
      return res.status(400).json({ Message: "email already exist" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should contains more than 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = await genarateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `signUp error ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ Message: "user not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: `incorrect password` });
    }

    const token = await genarateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: `logout succesfully...` });
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};
