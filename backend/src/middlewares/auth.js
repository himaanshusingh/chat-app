import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig.js";
import userModel from "../models/userModel.js";

export async function auth(req, res, next) {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}
