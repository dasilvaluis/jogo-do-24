import { combineReducers } from 'redux';
import CalculatorReducers from './CalculatorReducers';
import CardReducers from './CardReducers';

export default combineReducers({
  card: CardReducers.setCard,
  operation: CalculatorReducers.setOperation,
});
