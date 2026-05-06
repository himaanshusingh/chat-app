// External Modules :-
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

// Built-in Modules :-
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

// Local Modules :-
import { PORT } from "./config/envConfig.js";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// Create express app and http server :-
const app = express();
const server = http.createServer(app);

// Middleware setup :-
app.use(cors());
app.use(express.json({ limit: "4mb" }));

// Initialise connections :-
connectDb();
connectCloudinary();

// Initialize socket.io server :-
export const io = new Server(server, { cors: { origin: "*" } });
// store online users :-
export const userSocketMap = {}; // { userId: socketId }
// socket.io connection handler :-
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);
  if (userId) userSocketMap[userId] = socket.id;
  // emit online users to all connected clients :-
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Routes to use api :-
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
