import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { login, signup } from "../controllers/userController.js";
import { updateProfile, checkAuth } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", auth, updateProfile);
userRouter.get("/check", auth, checkAuth);

export default userRouter;
