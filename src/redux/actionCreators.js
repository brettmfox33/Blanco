import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  createGame: (numberOfPlayers, roomName, playerName) => ({numberOfPlayers, roomName, playerName}),
  updateEntireState: (newState) => ({newState}),
  startGame: undefined
});