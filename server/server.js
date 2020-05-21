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

  // Save socket ID to client's private state
  socket.emit("saveClientID", socket.id);

  // When a user creates a new game room => Create a new socket room with that roomID and add the
  // initial state to the room obj for joining rooms to ingest
  socket.on('createRoom', state => {
    socket.join(state.public.roomID, () => {
      const room = io.sockets.adapter.rooms[state.public.roomID];
      room['state'] = state;
      room['playerNumberSockets'] = {1: socket.id};

      room['currentTurn'] = Math.floor(Math.random() * (state.public.numberOfPlayers - 1 + 1) ) + 1;
      socket.emit("setFirstPlayerTurn", room['currentTurn']);
      room.state.public.currentPlayerTurn = room['currentTurn'];

      if (room.currentTurn === 1) {
        socket.emit("setTurn", socket.id);
      }
    })
  });

  // When a user joins a game room => Attempt to join that socket room if it isn't full and valid.
  // Send back the initial state for the joining client to ingest.
  socket.on('joinRoom', (roomID, playerName) => {
    const allRooms = io.sockets.adapter.rooms;
    // Check if the room exits and if the room is full
    if (allRooms[roomID] && allRooms[roomID].length < allRooms[roomID].state.public.numberOfPlayers) {
      const room = allRooms[roomID];

      // Check if name already exists
      const fullPlayers = Object.values(allRooms[roomID].state.public.players).filter(item => item.playerName);
      if(fullPlayers.some(e => e.playerName === playerName)) {
        socket.emit("nameFailure", "Player name taken");
        return
      }

      socket.join(roomID, () => {
        for (let i=2; i<=room.state.public.numberOfPlayers; i++) {
          if(!room.state.public.players[i].playerName) {
            room.state.public.players[i].playerName = playerName;
            room.playerNumberSockets[i] = socket.id;

            // Check if this player will have the first turn
            if (i === room.currentTurn) {
              socket.emit("setTurn", room.playerNumberSockets[room.currentTurn]);
            }

            break
          }
        }
        socket.emit("joinSuccess", allRooms[roomID].state.public)
      })
    }
    // Error joining occurred
    else {
      if (!allRooms[roomID]) {
        socket.emit("joinFailure", "This Room doesn't exist!");
      }
      else if (allRooms[roomID].state.public.numberOfPlayers === allRooms[roomID].length)
      {
        socket.emit("joinFailure", "This Room is full!");
      }
      else {
        socket.emit("joinFailure", "Unknown Socket Error!");
      }
    }
  });

  socket.on("changeTurn", (roomID, newCurrentTurn) => {
    const room = io.sockets.adapter.rooms[roomID];
    room.currentTurn = newCurrentTurn;
    io.in(roomID).emit("setTurn", room.playerNumberSockets[newCurrentTurn]);
  });

  // Send the new state to all clients connected to the socket room
  socket.on("publicStateChange", (publicState, roomID) => {
    socket.to(roomID).emit("updatePublicState", publicState)
  });

  socket.on("disconnect", () => {
    const allRooms =  io.sockets.adapter.rooms;
    const rooms = [];

    Object.keys(allRooms).map(roomID => {
      if (roomID.length === 4)
      {
        const room_obj = allRooms[roomID];
        if (Object.values(room_obj.playerNumberSockets).indexOf(socket.id) > -1) {
          rooms.push(roomID);
        }
      }
    });
    rooms.map(roomID => {
      socket.to(roomID).emit("disconnectFromRoom", {});
      delete rooms[roomID]
    });

    console.log(rooms);
    console.log("Client disconnected: ", socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));