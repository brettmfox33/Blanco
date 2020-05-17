import {handleActions} from "redux-actions";
import {actionCreators} from "../actionCreators";

const initialState = {
  clientID: null,
  currentTurn: false,
  pendingState: null
};

export default handleActions(
  {
    [actionCreators.private.saveClientID]: (state, action) => ({
      ...state,
      clientID: action.payload.clientID
    }),
    [actionCreators.private.setTurn]: (state, action) => ({
      ...state,
      currentTurn: action.payload.clientID === state.clientID
    }),
    [actionCreators.private.setPendingState]: (state, action) => ({
      ...state,
      pendingState: action.payload.newState
    }),
  },
  initialState
);
