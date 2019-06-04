import { combineReducers } from 'redux';
import operation from './OperationReducer';
import card from './CardReducer';

export default combineReducers({
  card,
  operation,
});
