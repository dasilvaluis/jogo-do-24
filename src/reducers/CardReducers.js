import {
  SET_CARD,
} from '../actions/types';

const INITIAL_CARD = {
  grade: 0,
  numbers: [],
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
