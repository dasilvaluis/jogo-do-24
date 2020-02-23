/* eslint-disable import/prefer-default-export */
import { types, CalculationActions, NumbersActions } from './actions';

export const afterResetOperation = store => next => (action) => {
  if (types.RESET_CALCULATION === action.type) {
    store.dispatch(NumbersActions.clearNumbers());
    store.dispatch(CalculationActions.setReady(false));
  }
  return next(action);
};
