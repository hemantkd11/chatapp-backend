const experss = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoutes");
const app = experss();
const socket = require("socket.io");
require("dotenv").config();
// require("http").Server();

app.use(cors());
app.use(experss.json());

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoute);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connection start");
  })
  .catch((err) => {
    console.log("error", err);
  });

// const User = require("./models/userModel");

const server = app.listen(8080, () => {
  console.log("Server running on port 8080");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Allowed methods
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    // console.log("sendmsg", { data });
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
