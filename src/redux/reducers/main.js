import { handleActions } from "redux-actions";
import {actionCreators} from "../actionCreators";
import getRandomInteger from "../../utils/getRandomInteger";

const initialState = {
  roomID: null,
  roomName: null,
  numberOfPlayers: null
};

export default handleActions(
  {
    [actionCreators.game.createGame]: (state, action) => ({
      ...state,
      roomID: getRandomInteger(1000, 9000),
      roomName: action.payload.roomName,
      numberOfPlayers: action.payload.numberOfPlayers
    })
  },
  initialState
);