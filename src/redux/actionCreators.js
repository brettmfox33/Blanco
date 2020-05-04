import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  public: {
    /** Game State **/
    createGame: (numberOfPlayers, playerName) => ({numberOfPlayers, playerName}),
    setFirstPlayer: (playerNumber) => ({playerNumber}),
    updatePublicState: (newPublicState) => ({newPublicState}),
    changeTurn: (newCurrentTurn) => ({newCurrentTurn}),
    /** End Round State **/
    calculateScore: undefined,
    /** End Game State **/
    endGame: undefined,
    /** Drag State **/
    dragStart: (factoryDisplay, tileColor) => ({factoryDisplay, tileColor}),
    dropTile: (location, patternRowIndex, playerNumber) => ({location, patternRowIndex, playerNumber}),
    dropTileFloor: (location, playerNumber) => ({location, playerNumber}),
    clearDragState: undefined,
    setDragStateHover: (patternRowIndex) => ({patternRowIndex}),
    setDragStateDrag: undefined
  },
  private: {
    saveClientID: (clientID) => ({clientID}),
    setTurn: (clientID) => ({clientID})
  }
});