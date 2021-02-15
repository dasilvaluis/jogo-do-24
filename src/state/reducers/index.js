import { combineReducers } from 'redux';
import { operation } from './operation-reducer';
import card from './card-reducer';
import difficulty from './difficulty-reducer';

export const reducers = combineReducers({
  card,
  operation,
  difficulty,
});
