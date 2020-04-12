/**
 * Set up a node server hosted on an Express application for the purpose of connecting a
 * socket.io instance.
 **/
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes");

// Set up an Express application
const app = express();
app.use(index);

// Set up a node server and pass it to a socketIo instance
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected");

  socket.on('Join Room', roomID => {
    socket.join(roomID)
  });

  socket.on("stateChange", (state, roomID) => {
    socket.to(roomID).emit("updateState", state)
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));