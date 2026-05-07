import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../controllers/messageController.js"; // prettier-ignore

const messageRouter = Router();

messageRouter.get("/users", auth, getUsersForSidebar);
messageRouter.get("/:id", auth, getMessages);
messageRouter.put("/mark:id", auth, markMessageAsSeen);
messageRouter.post("/send/:id", auth, sendMessage);

export default messageRouter;
