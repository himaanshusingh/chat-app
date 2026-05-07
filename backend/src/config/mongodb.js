import mongoose from "mongoose";
import { MONGODB_URI } from "./envConfig.js";

export default async function connectDb() {
  try {
    await mongoose.connect(`${MONGODB_URI}/chat-app`);
    console.log("Database is successfully connected");
  } catch (err) {
    console.log(err.message);
  }
}
