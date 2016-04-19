import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

import items from 'reducer/items';


const logger = createLogger();
const store = createStore(
  items,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(logger)
);

export default store;
