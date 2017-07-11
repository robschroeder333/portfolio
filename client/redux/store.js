import { createStore, applyMiddleware } from 'redux';
import Reducer from './reducer.js';
import logger from 'redux-logger';

import initialState from './initial.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  Reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(logger)
  )
);

export default store;
