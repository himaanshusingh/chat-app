import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let { message } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let conversation = await Conversation.findOne({
      partcipants: { $all: [sender, receiver] },
    });

    let newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        partcipants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    return res.status(201).json(newMessage);
  } catch (error) {
    return res
      .status(201)
      .json({ message: `caught error while sending ${error}` });
  }
};

export const getMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let conversation = await Conversation.findOne({
      partcipants: { $all: [sender, receiver] },
    }).populate("messages");

    return res.status(201).json(conversation?.messages);
  } catch (error) {
    return res.status(500).json({ message: `sending message error ${error}` });
  }
};
