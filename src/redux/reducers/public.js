import { handleActions } from "redux-actions";
import {actionCreators} from "../actionCreators";
import getRandomInteger from "../../utils/getRandomInteger";
import createPlayerObject from "../utils/createPlayerObject";
import buildFactoryDisplays from "../utils/buildFactoryDisplays";
import calculateScore from "../utils/calculateScore";
import calculateBonusScores from "../utils/calculateBonusScores";

const initialState = {
  roomID: null,
  roomName: null,
  numberOfPlayers: null,
  players: null,
  currentPlayerTurn: null,
  gameState: {
    nextRoundFirstPlayer: null,
    roundTiles:null,
    gameOver: false,
    availableTiles: {
      black: 2,
      blue: 4,
      red: 4,
      purple: 3,
      yellow: 4
    },
    boxTiles: {
      black: 20,
      blue: 20,
      red: 20,
      purple: 20,
      yellow: 20,
    },
    overflowTiles: {
      black: 0,
      blue: 0,
      red: 0,
      purple: 0,
      yellow: 0,
      firstPlayerToken: 1
    },
    factoryDisplays: null,
  },
  dragState: {
    dragState: null,
    tileColor: null,
    tileCount: null,
    factoryDisplay: null,
    fromCenter: false,
    hoveredPatternLine: null
  }
};

export default handleActions(
  {
    /** Game State **/
    [actionCreators.public.createGame]: (state, action) => {
      const numberOfPlayers = action.payload.numberOfPlayers;
      const factoryDisplays = buildFactoryDisplays(state, numberOfPlayers);

      return {
        ...state,
        roomID: getRandomInteger(1000, 9000),
        roomName: action.payload.roomName,
        numberOfPlayers: action.payload.numberOfPlayers,
        players: createPlayerObject(action.payload),
        gameState: {
          ...state.gameState,
          factoryDisplays: factoryDisplays,
          roundTiles: Object.keys(factoryDisplays).length * 4
        },
      }
    },
    [actionCreators.public.setFirstPlayer]: (state, action) => ({
      ...state,
      currentPlayerTurn: action.payload.playerNumber
    }),
    [actionCreators.public.updatePublicState]: (state, action) => {
      return action.payload.newPublicState
    },
    [actionCreators.public.changeTurn]: (state, action) => ({
      ...state,
      currentPlayerTurn: action.payload.newCurrentTurn
    }),
    /** End Round State **/
    [actionCreators.public.calculateScore]: state => {
      let factoryDisplays = {...state.gameState.factoryDisplays};

      // Calculate Score
      const [newPlayers, newGameState] = calculateScore(state);
      // Redistribute tiles to factory displays
      if (newGameState.gameOver) {
        factoryDisplays = buildFactoryDisplays(state, state.numberOfPlayers);
      }

      return {
        ...state,
        players: {
          ...newPlayers
        },
        gameState: {
          ...newGameState,
          factoryDisplays: factoryDisplays,
          roundTiles: Object.keys(factoryDisplays).length * 4,
          nextRoundFirstPlayer: null
        }
      }
    },
    /** End Game State **/
    [actionCreators.public.endGame]: state => {
      const players = calculateBonusScores(state);
      return {
        ...state,
        players: players
      }
    },
    /** Drag State **/
    [actionCreators.public.dragStart]: (state, action) => {
      let tileCount;
      if (action.payload.factoryDisplay){
        tileCount = state.gameState.factoryDisplays[action.payload.factoryDisplay].tiles[action.payload.tileColor]
      }
      else {
        tileCount = state.gameState.overflowTiles[action.payload.tileColor]
      }
      return {
        ...state,
        dragState: {
          ...state.dragState,
          dragState: 'dragging',
          factoryDisplay: action.payload.factoryDisplay ? action.payload.factoryDisplay : null,
          fromCenter: !action.payload.factoryDisplay,
          tileColor: action.payload.tileColor,
          tileCount: tileCount
        }
      }
    },
    [actionCreators.public.dropTile]: (state, action) => {
      const tileColor = state.dragState.tileColor;

      // Move the dragged tiles to the Pattern Line
      const patternLine = state.players[action.payload.playerNumber].board.patternLines[action.payload.patternRowIndex];
      let tileCount = state.dragState.tileCount;
      Object.keys(patternLine).map(patternLineIndex => {
        if (!patternLine[patternLineIndex] && tileCount) {
          patternLine[patternLineIndex]=tileColor;
          --tileCount;
        }
      });

      // Add left over dragged tiles to the Floor Line
      const floorLine = {...state.players[action.payload.playerNumber].board.floorLine};
      const boxTiles = {...state.gameState.boxTiles};
      if (tileCount) {
        Object.keys(floorLine).map(floorLineIndex => {
          if (tileCount && !floorLine[floorLineIndex].color) {
            floorLine[floorLineIndex].color = tileColor;
            --tileCount;
          }
        });
        // If the floor line is full and tiles still remain then add them to the box
        if (tileCount) {
          boxTiles[tileColor] = boxTiles[tileColor] + tileCount
        }
      }

      const factoryDisplays = {...state.gameState.factoryDisplays};
      const overflowTiles = {...state.gameState.overflowTiles};

      if (action.payload.location === 'factory') {
        // Remove the dragged tiles from the Factory Display
        // Add the left over Factory Display tiles to the Center
        factoryDisplays[state.dragState.factoryDisplay].tiles[state.dragState.tileColor] = 0;
        Object.keys(factoryDisplays[state.dragState.factoryDisplay].tiles).map(factoryTileColor => {
          overflowTiles[factoryTileColor] = overflowTiles[factoryTileColor] +
            factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor];
          factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor] = 0
        });
      }
      else {
        // Remove the dragged tiles from the overflow center.
        // If the first player token is still in the center then move it to the player's floor line.
        overflowTiles[state.dragState.tileColor] = 0;
        if (overflowTiles['firstPlayerToken']) {
          Object.keys(floorLine).map(floorLineIndex => {
            if (overflowTiles['firstPlayerToken'] && !floorLine[floorLineIndex].color) {
              floorLine[floorLineIndex].color = 'firstPlayerToken';
              state.gameState.nextRoundFirstPlayer = action.payload.playerNumber;
              overflowTiles['firstPlayerToken'] = 0;
            }
          });
        }
      }

      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.playerNumber]: {
            ...state.players[action.payload.playerNumber],
            board: {
              ...state.players[action.payload.playerNumber].board,
              patternLines: {
                ...state.players[action.payload.playerNumber].board.patternLines,
                [action.payload.patternRowIndex]: patternLine
              },
              floorLine: floorLine
            }
          }
        },
        gameState: {
          ...state.gameState,
          boxTiles: boxTiles,
          factoryDisplays: factoryDisplays,
          overflowTiles: overflowTiles,
          roundTiles: state.gameState.roundTiles - state.dragState.tileCount
        }
      }
    },
    [actionCreators.public.dropTileFloor]: (state, action) => {
      const tileColor = state.dragState.tileColor;
      let tileCount = state.dragState.tileCount;
      const newBoxTiles = {...state.gameState.boxTiles};

      // Moved the dragged tiles to the Floor Line
      const newFloorLine = {...state.players[action.payload.playerNumber].board.floorLine};
      Object.keys(newFloorLine).map(floorLineIndex => {
        if (tileCount && !newFloorLine[floorLineIndex].color) {
          newFloorLine[floorLineIndex].color = tileColor;
          --tileCount;
        }
      });

      // If the floor line is full and tiles still remain then add them to the box
      if (tileCount) {
        newBoxTiles[tileColor] = newBoxTiles[tileColor] + tileCount
      }

      const factoryDisplays = {...state.gameState.factoryDisplays};
      const overflowTiles = {...state.gameState.overflowTiles};

      if (action.payload.location === 'factory') {
        // Remove the dragged tiles from the Factory Display
        // Add the left over Factory Display tiles to the Center
        factoryDisplays[state.dragState.factoryDisplay].tiles[state.dragState.tileColor] = 0;
        Object.keys(factoryDisplays[state.dragState.factoryDisplay].tiles).map(factoryTileColor => {
          overflowTiles[factoryTileColor] = overflowTiles[factoryTileColor] +
            factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor];
          factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor] = 0
        });
      } else {
        // Remove the dragged tiles from the overflow center.
        // If the first player token is still in the center then move it to the player's floor line.
        overflowTiles[state.dragState.tileColor] = 0;
        if (overflowTiles['firstPlayerToken']) {
          Object.keys(newFloorLine).map(floorLineIndex => {
            if (overflowTiles['firstPlayerToken'] && !newFloorLine[floorLineIndex].color) {
              newFloorLine[floorLineIndex].color = 'firstPlayerToken';
              state.gameState.nextRoundFirstPlayer = action.payload.playerNumber;
              overflowTiles['firstPlayerToken'] = 0;
            }
          });
        }
      }

      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.playerNumber]: {
            ...state.players[action.payload.playerNumber],
            board: {
              ...state.players[action.payload.playerNumber].board,
              floorLine: newFloorLine
            }
          }
        },
        gameState: {
          ...state.gameState,
          boxTiles: newBoxTiles,
          factoryDisplays: factoryDisplays,
          overflowTiles: overflowTiles,
          roundTiles: state.gameState.roundTiles - state.dragState.tileCount
        }
      }
    },
    [actionCreators.public.clearDragState]: state => ({
      ...state,
      dragState: {
        dragState: null,
        factoryDisplay: null,
        tileColor: null,
        tileCount: null,
        hoveredPatternLine: null,
        fromCenter: false,
      }
    }),
    [actionCreators.public.setDragStateHover]: (state, action) => ({
      ...state,
      dragState: {
        ...state.dragState,
        dragState: 'hovering',
        hoveredPatternLine: action.payload.patternRowIndex
      }
    }),
    [actionCreators.public.setDragStateDrag]: state => ({
      ...state,
      dragState: {
        ...state.dragState,
        dragState: 'dragging',
        hoveredPatternLine: null
      }
    }),
  },
  initialState
);