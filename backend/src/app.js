// External Modules :-
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

// Built-in Modules :-
import http from "http";

// Local Modules :-
import { PORT } from "./config/envConfig.js";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// Create express app and http server :-
const app = express();
const server = http.createServer(app);

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

// Middleware setup :-
app.use(cors());
app.use(express.json({ limit: "4mb" }));

// Initialise connections :-
connectDb();
connectCloudinary();

// To check the api status :-
app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}

// Export server for vercel
export default server;
