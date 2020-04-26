import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  public: {
    createGame: (numberOfPlayers, roomName, playerName) => ({numberOfPlayers, roomName, playerName}),
    updatePublicState: (newPublicState) => ({newPublicState}),
    dragStart: (factoryDisplay, tileColor) => ({factoryDisplay, tileColor}),
    dropTile: (patternRowIndex, playerNumber) => ({patternRowIndex, playerNumber}),
    clearDragState: undefined,
    setDragStateHover: (patternRowIndex) => ({patternRowIndex}),
    setDragStateDrag: undefined
  },
  private: {
    saveClientID: (clientID) => ({clientID}),
    setTurn: (clientID) => ({clientID})
  }
});