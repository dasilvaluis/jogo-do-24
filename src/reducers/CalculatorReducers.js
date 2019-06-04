import { types } from '../actions';

const INITIAL_OPERATION = [];

class CalculatorReducers {
  static setOperation(state = INITIAL_OPERATION, action) {
    switch (action.type) {
      case types.SET_OPERATION:
        return action.payload;
      default:
        return state;
    }
  }
}

export default CalculatorReducers;
