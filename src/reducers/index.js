import { combineReducers } from 'redux';
import { operation, isReady } from './OperationReducer';
import usedNumbers from './NumbersReducer';
import card from './CardReducer';

export default combineReducers({
  card,
  operation,
  usedNumbers,
  isReady,
});
