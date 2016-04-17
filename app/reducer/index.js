import {createStore, applyMiddleware, combineReducers} from 'redux';
import createLogger from 'redux-logger';

import items from 'reducer/items';
import filter from 'reducer/filter';


const logger = createLogger();
const store = createStore(
  combineReducers({
      items,
      filter
  }),
  applyMiddleware(logger)
);

export default store;
