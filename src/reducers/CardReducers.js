import {
  SET_CARD,
} from '../actions/types';

const INITIAL_CARD = {
  numbers: [],
  grade: 0,
};

class CardReducers {
  static setCard(state = INITIAL_CARD, action) {
    switch (action.type) {
      case SET_CARD:
        return action.payload;
      default:
        return state;
    }
  }
}

export default CardReducers;
