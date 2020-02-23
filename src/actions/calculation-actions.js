import {
  RESET_CALCULATION,
  ADD_SYMBOL,
  SET_READY,
} from './types';

export default {
  resetOperation: () => ({
    type: RESET_CALCULATION,
  }),

  addSymbol: symbol => ({
    type: ADD_SYMBOL,
    payload: symbol,
  }),

  setReady: ready => ({
    type: SET_READY,
    payload: ready,
  }),
};
