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
      white: 20,
      yellow: 20
    },
    factoryDisplays: null
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
      }
    }),
    [actionCreators.public.updateEntireState]: (state, action) => {
      return action.payload.newState
    }
  },
  initialState
);