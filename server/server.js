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

  // When a user creates a new game room => Create a new socket room with that roomID and add the
  // initial state to the room obj for joining rooms to ingest
  socket.on('createRoom', state => {
    socket.join(state.roomID, () => {
      io.sockets.adapter.rooms[state.roomID]['state'] = state;
    })
  });

  // When a user joins a game room => Attempt to join that socket room if it isn't full and valid.
  // Send back the initial state for the joining client to ingest.
  socket.on('joinRoom', (roomID, playerName) => {
    const allRooms = io.sockets.adapter.rooms;
    if (allRooms[roomID] && allRooms[roomID].length < allRooms[roomID].state.numberOfPlayers) {
      const room = allRooms[roomID];

      socket.join(roomID, () => {
        let playerNumber = null;
        for (let i=2; i<=room.state.numberOfPlayers; i++) {
          if(!room.state.players[i]) {
            room.state.players[i] = {playerName:playerName};
            break
          }
        }

        socket.emit("joinSuccess", allRooms[roomID].state, playerNumber)
      })
    }
    // Error joining occurred
    else {
      if (!allRooms[roomID]) {
        socket.emit("joinFailure", "This Room doesn't exist!");
      }
      else if (allRooms[roomID].state.numberOfPlayers === allRooms[roomID].length)
      {
        socket.emit("joinFailure", "This Room is full!");
      }
      else {
        socket.emit("joinFailure", "Unknown Socket Error!");
      }
    }
  });

  // Send the new state to all clients connected to the socket room
  socket.on("stateChange", (state, roomID) => {
    socket.to(roomID).emit("updateEntireState", state)
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));