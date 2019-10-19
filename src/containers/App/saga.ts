import { takeEvery, takeLatest, put, call, all, fork } from 'redux-saga/effects';

import { INCREMENT, DECREMENT, USER_AUTH } from './actionTypes';
import {
  loginUser,
  registerUser,
  signInWithGoogle,
  logout,
} from 'utils/firebase';
import { requestType } from 'utils/redux';
import { userActions } from './actions';
import { AUTH_TYPES } from 'utils/constants';
import ReduxAction from 'types/auth/ReduxAction.type';
import AuthAction from 'types/auth/AuthAction.type';
import UserInput from 'types/auth/UserInput.type';
import AuthErrors from 'types/auth/AuthErrors.type';

const { LOGIN_PASSWORD, REGISTER_PASSWORD, GOOGLE_SIGNIN, LOGOUT } = AUTH_TYPES;

const firebaseUserAction = userActions<firebase.auth.UserCredential>();
const authFailureAction = userActions<AuthErrors>();

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

function* userAuthRequested(action: ReduxAction<AuthAction>) {
  const { authType, user } = action.payload;
  yield console.log({ authType, user });
  switch (authType) {
    case LOGIN_PASSWORD:
      yield call(loginWithPassword, user as UserInput);
      break;
    case REGISTER_PASSWORD:
      yield call(registerWithPassword, user as UserInput);
      break;
    case GOOGLE_SIGNIN:
      yield call(googleSignIn);
      break;
    case LOGOUT:
      yield console.log('log out called');
      yield call(logoutUser);
      break;
    default:
      yield call(invalidAction, action);
      break;
  }
}

function* loginWithPassword(user: UserInput) {
  try {
    const userData = yield call(loginUser, user.email, user.password);
    yield put(firebaseUserAction.success(userData));
  } catch (e) {
    yield put(
      authFailureAction.failure({
        login: e.message
      })
    );
  }
}

function* registerWithPassword(user: UserInput) {
  try {
    const userData = yield call(registerUser, user.email, user.password);
    yield put(firebaseUserAction.success(userData));
  } catch (e) {
    yield put(
      authFailureAction.failure({
        register: e.message,
      })
    );
  }
}

function* googleSignIn() {
  try {
    const userData = yield call(signInWithGoogle);
    yield put(firebaseUserAction.success(userData));
  } catch (e) {
    yield put(
      authFailureAction.failure({
        googleSignIn: e.message,
      })
    );
  }
}

function* logoutUser() {
  yield console.log('logging out');
  yield call(logout);
  yield put(firebaseUserAction.clear());
}

function* invalidAction(action: ReduxAction<any>) {
  yield console.log(`Unsupported action called`, { action });
}

export function* loginRequest() {
  yield takeLatest(requestType(USER_AUTH), userAuthRequested);
}
