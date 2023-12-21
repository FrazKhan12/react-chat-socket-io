const express = require("express");

const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const socketIo = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

socketIo.on("connection", (socket) => {
  console.log(` ${socket.id} A user is conneted`);

  socket.on("message", (data) => {
    socketIo.emit("messageResponse", data);
  });
  socket.on("newUser", (data) => {
    users.push(data);
    socketIo.emit("newUserResponse", users);
  });
  console.log(users);
  socket.on("disconnect", () => {
    console.log("User Disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    socketIo.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.use(cors);

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

const port = 4000;

http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
