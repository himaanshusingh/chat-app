import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import messageModel from "../models/messageModel.js";
import { io, userSocketMap } from "../app.js";

// Get all users except the loggedIn User :-
export async function getUsersForSidebar(req, res) {
  try {
    const userId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: userId } })
      .select("-password");

    // Count no of messages not seen.
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await messageModel.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) unseenMessages[user._id] = messages.length;
    });

    await Promise.all(promises);
    res.status(200).json({
      success: true,
      users: filteredUsers,
      unseenMessages,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}

// Get all messages for selected user :-
export async function getMessages(req, res) {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    await messageModel.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true },
    );

    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}

// api to mark message as seen using message id :-
export async function markMessageAsSeen(req, res) {
  try {
    const { id } = req.params;
    await messageModel.findByIdAndUpdate(id, { seen: true });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}

// Send message to selected User :-
export async function sendMessage(req, res) {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await messageModel.create({
      senderId, receiverId, text, image: imageUrl
    }); // prettier-ignore

    // Emit the new message to the receiver's socket :-
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ success: true, newMessage });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}
