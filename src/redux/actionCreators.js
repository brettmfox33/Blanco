import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  createGame: (numberOfPlayers, roomName, playerName) => ({numberOfPlayers, roomName, playerName}),
  addPlayer: (playerName, playerNumber) => ({playerName, playerNumber}),
  updateEntireState: (newState) => ({newState}),
  getState: undefined
});