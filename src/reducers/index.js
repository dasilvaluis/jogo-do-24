import { combineReducers } from 'redux';
import { operation, isReady } from './operation-reducer';
import usedNumbers from './numbers-reducer';
import card from './card-reducer';

export default combineReducers({
  card,
  operation,
  usedNumbers,
  isReady,
});
