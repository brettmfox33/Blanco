import {createActions} from 'redux-actions';

export const actionCreators = createActions({
  test: {
    CHANGE_INPUT: (input) => ({input}),
  }
});