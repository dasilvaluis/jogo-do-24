import {
  types,
} from '../actions';

const INITIAL_CARD = {
  grade: 0,
  numbers: [],
};

class CardReducers {
  static setCard(state = INITIAL_CARD, action) {
    switch (action.type) {
      case types.SET_CARD:
        return action.payload;
      default:
        return state;
    }
  }
}

export default CardReducers;
