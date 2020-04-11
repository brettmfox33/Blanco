import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  game: {
    createGame: (numberOfPlayers, roomName) => ({numberOfPlayers, roomName}),
  }
});