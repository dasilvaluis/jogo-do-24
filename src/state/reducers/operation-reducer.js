import { types } from '../actions';

const INITIAL_OPERATION = [];

export const operation = (state = INITIAL_OPERATION, action) => {
  switch (action.type) {
    case types.RESET_OPERATION:
      return INITIAL_OPERATION;

    case types.ADD_SYMBOL:
      return [ ...state, action.payload ];

    default:
      return state;
  }
};
