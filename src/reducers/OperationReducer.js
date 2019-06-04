import { types } from '../actions';

const INITIAL_OPERATION = [];

export default (state = INITIAL_OPERATION, action) => {
  switch (action.type) {
    case types.SET_OPERATION:
      return action.payload;
    case types.ADD_OPERATOR:
      return [...state, action.payload];
    default:
      return state;
  }
};
