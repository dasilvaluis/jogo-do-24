import {
  SET_CARD,
} from './types';

export default {
  setCard: card => ({
    type: SET_CARD,
    payload: card,
  }),
};

