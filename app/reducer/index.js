import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import reducer from 'reducer/reducer';


const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(logger)
);

export default store;
