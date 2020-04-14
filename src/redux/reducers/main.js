import { handleActions } from "redux-actions";
import {actionCreators} from "../actionCreators";
import getRandomInteger from "../../utils/getRandomInteger";
import createPlayerObject from "../utils/createPlayerObject";

const initialState = {
  roomID: null,
  roomName: null,
  numberOfPlayers: null,
  numberOfFactoryTiles: null,
  players: null,
  playersReady: false
};

export default handleActions(
  {
    [actionCreators.createGame]: (state, action) => ({
      ...state,
      roomID: getRandomInteger(1000, 9000),
      roomName: action.payload.roomName,
      numberOfPlayers: action.payload.numberOfPlayers,
      numberOfFactoryTiles: action.payload.numberOfPlayers === 2 ? 7 : 3 ? 8 : 9,
      players: createPlayerObject(action.payload)
    }),
    [actionCreators.updateEntireState]: (state, action) => {
      return action.payload.newState
    }
  },
  initialState
);