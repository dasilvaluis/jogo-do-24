import { types } from '../actions';

const INITIAL_NUMBERS = [];

export default (state = INITIAL_NUMBERS, action) => {
  switch (action.type) {
    case types.ADD_NUMBER:
      return [ ...state, action.payload ];

    case types.CLEAR_NUMBERS:
      return INITIAL_NUMBERS;

    default:
      return state;
  }
};
