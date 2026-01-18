import { RESET_OPERATION, ADD_SYMBOL, REMOVE_LAST_SYMBOL } from './types';

export default {
  resetOperation: () => ({
    type: RESET_OPERATION,
  }),

  addSymbol: (symbol) => ({
    type: ADD_SYMBOL,
    payload: symbol,
  }),

  removeLastSymbol: () => ({
    type: REMOVE_LAST_SYMBOL,
  }),
};
