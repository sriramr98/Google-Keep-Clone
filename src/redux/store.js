import {createStore, applyMiddleware, compose} from 'redux';
import reduxLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default (initialState = {}) => {
  let composeEnhancers = compose;
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [reduxLogger, sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers));

  sagaMiddleware.run(rootSaga);
  return store;
};
