import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  public: {
    createGame: (numberOfPlayers, roomName, playerName) => ({numberOfPlayers, roomName, playerName}),
    updateEntireState: (newState) => ({newState}),
  },
  private: {
    saveClientID: (clientID) => ({clientID}),
    setTurn: (clientID) => ({clientID})
  }
});