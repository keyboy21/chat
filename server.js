const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
app = express();
app.use(express.static(path.join(__dirname, "public")));
require("dotenv").config();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.DB_HOST || 5000;

const users = [];

io.on("connection", (socket) => {
  socket.on("join", ({ username }) => {
    const user = userjoin(socket.id, username);
    socket.join(user.username);

    // User connnected
    socket.emit("Welcometochat", formatMessage(`${username}`, "Welcome to chat"));
    socket.broadcast.emit(
      "Welcometochat",
      formatMessage("Server", `${username} has joined the chat`)
    );
    socket.on("message", (data) => {
      const user = getUser(socket.id);
      io.emit("CHatmessage", formatMessage(`${username}`, data));
    });

    // dissconnect
    socket.on("disconnect", () => {
      io.emit(
        "Welcometochat",
        formatMessage("Server", `${username} left the chat`)
      );
    });
  });

 
});

function userjoin(username) {
  const user = { username };

  users.push(user);
  return user;
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
