import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  createGame: (numberOfPlayers, roomName) => ({numberOfPlayers, roomName}),
  addPlayer: (playerName, playerNumber) => ({playerName, playerNumber})
});