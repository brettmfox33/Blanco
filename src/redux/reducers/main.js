import { handleActions } from "redux-actions";
import {actionCreators} from "../actionCreators";

const initialState = {
  input: 'poop'
};

export default handleActions(
  {
    [actionCreators.test.changeInput]: (state, action) => ({
      ...state,
      input: action.payload.input
    }),
  },
  initialState
);