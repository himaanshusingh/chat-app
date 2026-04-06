## 💬 Realtime Chat App:

### A feature-rich, real-time messaging application that allows users to communicate instantly. Built with modern web technologies for seamless, low-latency communication.

### Live Demo :- [https://chat-app-vercel.app](https://chat-app-greatstack.vercel.app/)

![chat-app Home Page](../../public/home_page.jpg) <!-- Replace with actual screenshot -->

## ✨ Features

- **Real-time messaging** – Instant message delivery using WebSockets.
- **User authentication** – Sign up / login with JWT or session-based auth.
- **Private & group chats** – One-to-one conversations or create group rooms.
- **Typing indicators** – See when someone is typing.
- **Online / offline status** – Know who’s currently active.
- **Message history** – Persistent storage with scroll-back.
- **File sharing** – Send images, documents, or emojis (optional).
- **Read receipts** – Check if your message has been seen.
- **Responsive design** – Works on desktop, tablet, and mobile.

## 🛠️ Tech Stack

| Layer          | Technology                                            |
| -------------- | ----------------------------------------------------- |
| Frontend       | React + Tailwind CSS / Material UI                    |
| Backend        | Node.js + Express                                     |
| Real-time      | Socket.io (WebSockets)                                |
| Database       | MongoDB (with Mongoose) or PostgreSQL                 |
| Authentication | JSON Web Tokens (JWT) + bcrypt                        |
| Deployment     | Docker, Vercel (frontend), Heroku / Railway (backend) |

## 📦 Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB instance (local or Atlas)

### Clone the repository

```bash
git clone https://github.com/himaanshusingh/chat-app.git
```

```bash
cd chat-app
```

### Install dependencies for frontend and backend separately

**Tip:** To efficiently install dependencies for both frontend and backend simultaneously, use split terminals.

**Backend setup**

```bash
cd backend
cp .env.example .env          # Configure your environment variables
npm install
npm run dev                   # Starts server on http://localhost:3000
```

**Frontend setup**

```bash
cd frontend
cp .env.example .env          # Set REACT_APP_API_URL if needed
npm install
npm start                     # Runs on http://localhost:5173
```

### 🔧 Environment Variables

Create a .env file in the backend folder:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:3000
```

For the frontend (React example):

```bash
REACT_APP_API_URL=http://localhost:5173
REACT_APP_SOCKET_URL=http://localhost:5173
```

### 🚀 Usage

Register a new account or log in with existing credentials.
Search for users by username or email to start a private chat.
Click “New Group” to create a group chat and invite members.
Send messages, emojis, and files in real time.
See typing status and online indicators.

**📡 WebSocket Events (Socket.io)**
Event Direction Description
join_room Client → Join a private or group chat room
send_message Client → Emit a new message
receive_message Server → Broadcast message to room members
typing Client → Notify that a user is typing
stop_typing Client → Stop typing indicator
user_online Server → Broadcast online status

### 📁 Project Structure

```bash
realtime-chat-app/
├── backend/
│ ├── models/ # User, Message, Room schemas
│ ├── controllers/ # Auth, message handlers
│ ├── routes/ # API endpoints
│ ├── socket/ # Socket.io event handlers
│ ├── middleware/ # Auth middleware
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/ # ChatWindow, Message, Sidebar, etc.
│ │ ├── context/ # Socket or Auth context
│ │ ├── hooks/ # useSocket, useAuth
│ │ └── pages/ # Login, Register, Dashboard
│ └── public/
└── README.md
```

## 🧪 Running Tests

### Backend tests (Jest / Mocha)

```bash
cd backend
npm test
```

### Frontend tests (React Testing Library)

```bash
cd frontend
npm test
```

### 🐳 Docker (Optional)

**Build and run with docker-compose**

```bash
docker-compose up --build
```

Example docker-compose.yml includes services for backend, frontend, and MongoDB.

### 🤝 Contributing

Contributions are welcome! Please follow these steps:
Fork the project.
Create your feature branch (git checkout -b feature/amazing-feature).
Commit your changes (git commit -m 'Add some amazing feature').
Push to the branch (git push origin feature/amazing-feature).
Open a Pull Request.

**📄 License**
Distributed under the MIT License. See LICENSE for more information.

## Author

- [@HimanshuSingh](https://github.com/himaanshusingh)
