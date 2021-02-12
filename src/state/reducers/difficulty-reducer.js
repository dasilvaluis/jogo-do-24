import { types } from '../actions';

const INITIAL_DIFFICULTY = -1;

export default (state = INITIAL_DIFFICULTY, action) => {
  switch (action.type) {
    case types.SET_DIFFICULTY:
      return action.payload;
    default:
      return state;
  }
};
