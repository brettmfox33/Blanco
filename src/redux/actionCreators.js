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
    dragStart: (factoryDisplay, tileColor, originX, originY) => ({factoryDisplay, tileColor, originX, originY}),
    dropTile: (location, patternRowIndex, playerNumber) => ({location, patternRowIndex, playerNumber}),
    dropTileFloor: (location, playerNumber) => ({location, playerNumber}),
    clearDragState: undefined,
    setDragStateHover: (patternRowIndex) => ({patternRowIndex}),
    setDragStateDrag: undefined,
    /** Animations **/
    setAnimation: (destinationX, destinationY) => ({destinationX, destinationY}),
    updateEndTurnAnimation: (endTurnAnimation) => ({endTurnAnimation}),
    endTurn: undefined,
    setEndRoundAnimations: undefined,
    setAnimatedFinished: undefined,
    /** Disconnect **/
    disconnect: undefined,
    /** Game Chat **/
    sendMessage: (playerNumber, message) => ({playerNumber, message})
  },
  private: {
    saveClientID: (clientID) => ({clientID}),
    setTurn: (clientID) => ({clientID}),
    setPendingState: (newState) => ({newState}),
    setPlayerNumber: (playerNumber) => ({playerNumber})
  }
});