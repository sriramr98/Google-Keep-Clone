import {takeEvery, takeLatest, put, call, all, fork} from 'redux-saga/effects';

import {INCREMENT, DECREMENT, USER_AUTH} from './actionTypes';
import {loginUser, registerUser, signInWithGoogle, logout} from 'utils/firebase';
import {requestType} from 'utils/redux';
import {userActions} from './actions';
import {AUTH_TYPES} from 'utils/constants';

const {LOGIN_PASSWORD, REGISTER_PASSWORD, GOOGLE_SIGNIN, LOGOUT} = AUTH_TYPES;

function* continueIncrementAction() {
  yield console.log('INCREMENT CALLED');
}

export function* incrementSaga() {
  yield takeEvery(INCREMENT, continueIncrementAction);
}

function* continueDecrementAction() {
  yield console.log('DECREMENT CALLED');
}

export function* decrementSaga() {
  yield takeEvery(DECREMENT, continueDecrementAction);
}

export default function* appSagas() {
  yield all([
    yield fork(incrementSaga),
    yield fork(decrementSaga),
    yield fork(loginRequest),
  ]);
}

function* userAuthRequested(action) {
  const {authType, user} = action.payload;
  yield console.log({authType, user});
  switch (authType) {
    case LOGIN_PASSWORD:
      yield call(loginWithPassword, user);
      break;
    case REGISTER_PASSWORD:
      yield call(registerWithPassword, user);
      break;
    case GOOGLE_SIGNIN:
      yield call(googleSignIn);
      break;
    case LOGOUT:
      yield console.log('log out called');
      yield call(logoutUser);
      break;
    default:
      yield call(invalidAction);
      break;
  }
}

function* loginWithPassword(user) {
  try {
    const userData = yield call(loginUser, user.email, user.password);
    yield put(userActions.success(userData));
  } catch (e) {
    yield put(
      userActions.failure({
        ...e,
        login: true,
      })
    );
  }
}

function* registerWithPassword(user) {
  try {
    const userData = yield call(registerUser, user.email, user.password);
    yield put(userActions.success(userData));
  } catch (e) {
    yield put(
      userActions.failure({
        ...e,
        register: true,
      })
    );
  }
}

function* googleSignIn() {
  try {
    const userData = yield call(signInWithGoogle);
    yield put(userActions.success(userData));
  } catch (e) {
    yield put(
      userActions.failure({
        ...e,
        googleSignIn: true,
      })
    );
  }
}

function* logoutUser() {
  yield console.log('logging out');
  yield call(logout);
  yield put(userActions.clear());
}

function* invalidAction(action) {
  yield console.log(`Unsupported action called`, {action});
}

export function* loginRequest() {
  yield takeLatest(requestType(USER_AUTH), userAuthRequested);
}
