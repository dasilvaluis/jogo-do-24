import { ADD_POINT, SET_POINTS } from './types';

export default {
  addPoint: (quantity = 1) => ({
    type: ADD_POINT,
    payload: quantity,
  }),
  setPoints: () => ({
    type: SET_POINTS,
  }),
};
