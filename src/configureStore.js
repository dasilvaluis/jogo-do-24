import { createStore, applyMiddleware } from 'redux';
import { afterResetOperation } from './reduxMiddleware';
import reducers from './reducers';

export default () => createStore(reducers, applyMiddleware(afterResetOperation));
