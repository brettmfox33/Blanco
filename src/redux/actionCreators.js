import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  public: {
    createGame: (numberOfPlayers, roomName, playerName) => ({numberOfPlayers, roomName, playerName}),
    setFirstPlayer: (playerNumber) => ({playerNumber}),
    updatePublicState: (newPublicState) => ({newPublicState}),
    dragStart: (factoryDisplay, tileColor) => ({factoryDisplay, tileColor}),
    dropTile: (location, patternRowIndex, playerNumber) => ({location, patternRowIndex, playerNumber}),
    clearDragState: undefined,
    setDragStateHover: (patternRowIndex) => ({patternRowIndex}),
    setDragStateDrag: undefined
  },
  private: {
    saveClientID: (clientID) => ({clientID}),
    setTurn: (clientID) => ({clientID})
  }
});