import {
  SET_OPERATION,
} from './types';

class CalculatorActions {
  static setOperation = operation => ({
    type: SET_OPERATION,
    payload: operation,
  });
}

export default CalculatorActions;
