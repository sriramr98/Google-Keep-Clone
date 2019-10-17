import {all, spawn} from 'redux-saga/effects';
import appSagas from 'containers/App/saga';

export default function* rootSaga() {
  yield all([spawn(appSagas)]);
}
