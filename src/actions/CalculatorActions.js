import {
  SET_OPERATION,
} from './types';

export default {
  setOperation: operation => ({
    type: SET_OPERATION,
    payload: operation,
  }),
};
