import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  public: {
    createGame: (numberOfPlayers, roomName, playerName) => ({numberOfPlayers, roomName, playerName}),
    updatePublicState: (newPublicState) => ({newPublicState}),
  },
  private: {
    saveClientID: (clientID) => ({clientID}),
    setTurn: (clientID) => ({clientID})
  }
});