const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Connection = require('./db.js');
const Chat = require('./models/Chat.js');

const app = express();

// DB connection
Connection();

// Middleware
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Socket.io server
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-1-k4xg.onrender.com",
    methods: ["GET", "POST"]
  },
  transports: ["websocket"]
});

io.on('connection', (socket) => {
  console.log("User connected");

  const loadMessages = async () => {
    try {
      const messages = await Chat.find().sort({ timestamp: 1 });
      socket.emit('chat', messages);
    } catch (err) {
      console.log(err);
    }
  };

  loadMessages();

  socket.on('newMessage', async (msg) => {
    try {
      const newMessage = new Chat(msg);
      await newMessage.save();
      io.emit('message', msg);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('disconnect', () => {
    console.log("User disconnected");
  });
});

// ✅ Render requires dynamic port
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
