import { handleActions } from "redux-actions";
import {actionCreators} from "../actionCreators";
import getRandomInteger from "../../utils/getRandomInteger";
import createPlayerObject from "../utils/createPlayerObject";
import buildFactoryDisplays from "../utils/buildFactoryDisplays";

const initialState = {
  roomID: null,
  roomName: null,
  numberOfPlayers: null,
  players: null,
  gameState: {
    availableTiles: {
      black: 20,
      blue: 20,
      red: 20,
      gray: 20,
      yellow: 20
    },
    centerTiles: {
      black: 0,
      blue: 0,
      red: 0,
      gray: 0,
      yellow: 0,
      firstPlayerToken: 1
    },
    factoryDisplays: null,
  },
  dragState: {
    dragState: null,
    factoryDisplay: null,
    tileColor: null,
    tileCount: null,
    hoveredPatternLine: null
  }
};

export default handleActions(
  {
    [actionCreators.public.createGame]: (state, action) => ({
      ...state,
      roomID: getRandomInteger(1000, 9000),
      roomName: action.payload.roomName,
      numberOfPlayers: action.payload.numberOfPlayers,
      players: createPlayerObject(action.payload),
      gameState: {
        ...state.gameState,
        factoryDisplays: buildFactoryDisplays(state, action)
      },
    }),
    [actionCreators.public.updatePublicState]: (state, action) => {
      return action.payload.newPublicState
    },
    [actionCreators.public.dragStart]: (state, action) => ({
      ...state,
      dragState: {
        ...state.dragState,
        dragState: 'dragging',
        factoryDisplay: action.payload.factoryDisplay,
        tileColor: action.payload.tileColor,
        tileCount: state.gameState.factoryDisplays[action.payload.factoryDisplay].tiles[action.payload.tileColor]
      }
    }),
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
      const floorLine = state.players[action.payload.playerNumber].board.floorLine;
      if (tileCount) {
        Object.keys(floorLine).map(floorLineIndex => {
          if (tileCount && !floorLine[floorLineIndex].color) {
            floorLine[floorLineIndex].color = tileColor;
            --tileCount;
          }
        })
      }

      // Remove the dragged tiles from the Factory Display
      // Add the left over Factory Display tiles to the Center
      const factoryDisplays = state.gameState.factoryDisplays;
      const centerTiles = state.gameState.centerTiles;

      factoryDisplays[state.dragState.factoryDisplay].tiles[state.dragState.tileColor] = 0;
      Object.keys(factoryDisplays[state.dragState.factoryDisplay].tiles).map(factoryTileColor => {
        centerTiles[factoryTileColor] = centerTiles[factoryTileColor] +
          factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor];
        factoryDisplays[state.dragState.factoryDisplay].tiles[factoryTileColor] = 0
      });

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
          factoryDisplays: factoryDisplays,
          centerTiles: centerTiles
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
        hoveredPatternLine: null
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