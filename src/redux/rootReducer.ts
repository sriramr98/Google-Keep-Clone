import {combineReducers} from 'redux';
import AppReducer from 'containers/App/reducer';

const rootReducer = combineReducers({
  app: AppReducer,
});

export default rootReducer;
