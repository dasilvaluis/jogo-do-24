import { types } from '../actions';

export default (state = 0, action) => {
  switch (action.type) {
    case types.ADD_POINT:
      return state + action.payload;
    case types.SET_POINTS:
      return action.payload;
    default:
      return state;
  }
};
