import { types, OperationActions, NumbersActions } from './actions';

export const afterResetOperation = store => next => (action) => {
  if (types.RESET_OPERATION === action.type) {
    store.dispatch(NumbersActions.clearNumbers());
    store.dispatch(OperationActions.setReady(false));
  }
  return next(action);
};
