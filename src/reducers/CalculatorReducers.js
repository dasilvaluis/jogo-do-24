import {
  SET_OPERATION,
} from '../actions/types';

const INITIAL_OPERATION = [];

class CalculatorReducers {
  static setOperation(state = INITIAL_OPERATION, action) {
    switch (action.type) {
      case SET_OPERATION:
        return action.payload;
      default:
        return state;
    }
  }
}

export default CalculatorReducers;
