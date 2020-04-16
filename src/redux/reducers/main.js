import { handleActions } from "redux-actions";
import {actionCreators} from "../actionCreators";
import getRandomInteger from "../../utils/getRandomInteger";
import createPlayerObject from "../utils/createPlayerObject";
import buildFactoryDisplays from "../utils/buildFactoryDisplays";

const initialState = {
  roomID: null,
  roomName: null,
  numberOfPlayers: null,
  numberOfFactoryDisplays: null,
  players: null,
  playersReady: false,
  gameState: {
    availableTiles: {
      black: 20,
      blue: 20,
      red: 20,
      white: 20,
      yellow: 20
    },
    factoryDisplays: null
  }
};

export default handleActions(
  {
    [actionCreators.createGame]: (state, action) => ({
      ...state,
      roomID: getRandomInteger(1000, 9000),
      roomName: action.payload.roomName,
      numberOfPlayers: action.payload.numberOfPlayers,
      numberOfFactoryDisplays: action.payload.numberOfPlayers === 2 ? 7 : 3 ? 8 : 9,
      players: createPlayerObject(action.payload)
    }),
    [actionCreators.updateEntireState]: (state, action) => {
      return action.payload.newState
    },
    [actionCreators.startGame]: state => ({
      ...state,
      gameState: {
        ...state.gameState,
        factoryDisplays: buildFactoryDisplays(state)
      }
    })
  },
  initialState
);