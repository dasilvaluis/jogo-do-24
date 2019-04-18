import {
  SET_CARD,
} from './types';

class CardActions {
  static setCard = card => ({
    type: SET_CARD,
    payload: card,
  });
}

export default CardActions;
