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
      const newRoom = io.sockets.adapter.rooms[state.roomID];
      newRoom['state'] = state;
      newRoom['players'] = {1:socket.id}
    })
  });

  // When a user joins a game room => Attempt to join that socket room if it isn't full and valid.
  // Send back the initial state for the joining client to ingest.
  socket.on('joinRoom', roomID => {
    const allRooms = io.sockets.adapter.rooms;
    if (allRooms[roomID] && allRooms[roomID].length < allRooms[roomID].state.numberOfPlayers) {
      const room = allRooms[roomID];
      socket.join(roomID, () => {

        // Set the player number depending on which number room is available on the socket
        let playerNumber = null;
        for (let i=1; i<=room.state.numberOfPlayers; i++) {
          if (!room.players[i]){
            room.players[i] = socket.id;
            playerNumber = i;
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
      else if (allRooms[roomID].maxLength === allRooms[roomID].length)
      {
        socket.emit("joinFailure", "This Room is full!");
      }
      else {
        socket.emit("joinFailure", "Unknown Socket Error!");
      }
    }
  });

  socket.on('addPlayer', (playerName, playerNumber, roomID) => {
    io.sockets.adapter.rooms[roomID].state.players[playerNumber] = {playerName: playerName};
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