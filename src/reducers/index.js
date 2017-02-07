import { combineReducers } from 'redux';
import timer from './timer';
import table from './table';
import modals from './modals';
import stats from './stats';

export const app = combineReducers({
  timer,
  table,
  modals,
  stats
});