import {
  ADD_NUMBER,
  CLEAR_NUMBERS,
} from './types';

export default {
  addNumber: number => ({
    type: ADD_NUMBER,
    payload: number,
  }),

  clearNumbers: () => ({
    type: CLEAR_NUMBERS,
    payload: [],
  }),
};
