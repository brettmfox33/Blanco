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
  console.log("New client connected: ", socket.id);

  socket.on('createRoom', (roomID, numberOfPlayers) => {
    socket.join(roomID, () => {
      console.log('Room '+ roomID + ' successfully created');
      io.sockets.adapter.rooms[roomID]['maxLength'] = numberOfPlayers
    })
  });

  socket.on('joinRoom', roomID => {
    const allRooms = io.sockets.adapter.rooms;
    if (allRooms[roomID] && allRooms[roomID].length < allRooms[roomID].maxLength) {
      socket.join(roomID, () => {
        // TO DO: Emit success to client
        console.log('Room '+ roomID + ' successfully joined');
      })
    }
    else {
      if (!allRooms[roomID]) {
        console.log("error! This Room doesn't exist")
      }
      else if (allRooms[roomID].maxLength === allRooms[roomID].length)
      {
        // TO DO: Emit error to client
        console.log("error! This Room is full");
      }
      else {
        // TO DO: Emit error to client
        console.log("some other error")
      }
    }
  });

  socket.on("stateChange", (state, roomID) => {
    socket.to(roomID).emit("updateState", state)
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));