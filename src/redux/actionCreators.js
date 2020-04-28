import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  public: {
    /** Game State **/
    createGame: (numberOfPlayers, roomName, playerName) => ({numberOfPlayers, roomName, playerName}),
    setFirstPlayer: (playerNumber) => ({playerNumber}),
    updatePublicState: (newPublicState) => ({newPublicState}),
    changeTurn: (newCurrentTurn) => ({newCurrentTurn}),
    /** End Round State **/
    calculateScore: undefined,
    /** Drag State **/
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