import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const { socket, axios } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  // Function to get all users for sidebar.
  async function getUsers() {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  // Function to get messages from selected user.
  async function getMessages(userId) {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  // Function to send message to selected user.
  async function sendMessage(messageData) {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData,
      );
      if (data.success) setMessages((prevMsg) => [...prevMsg, data.newMessage]);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  }

  // Function to subscribe to messages for selected user.
  async function subscribeToMessages() {
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  }

  // Function to unsubscribe from messages.
  function unsubscribeFromMessages() {
    if (socket) socket.off("newMessage");
  }

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = { users, getUsers, messages, setMessages, getMessages, selectedUser, setSelectedUser, sendMessage, unseenMessages, setUnseenMessages }; // prettier-ignore

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
