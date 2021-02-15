import { types, CalculationActions } from './actions';

export const afterResetOperation = (store) => (next) => (action) => {
  if (types.RESET_OPERATION === action.type) {
    store.dispatch(CalculationActions.setReady(false));
  }

  return next(action);
};
