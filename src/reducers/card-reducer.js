import {
  types,
} from '../actions';

const INITIAL_CARD = {
  grade: 0,
  numbers: [],
};

export default (state = INITIAL_CARD, action) => {
  switch (action.type) {
    case types.SET_CARD:
      return action.payload;
    default:
      return state;
  }
};
