import {takeLatest, put, call, all} from 'redux-saga/effects';

import {USER_AUTH} from './actionTypes';
import {
  loginUser,
  registerUser,
  signInWithGoogle,
  logout,
  getUserDoc,
} from 'utils/firebase';
import {requestType} from 'utils/redux';
import {userActions} from './actions';
import {AUTH_TYPES, FIREBASE_COLLECTIONS} from 'utils/constants';
import ReduxAction from 'types/auth/ReduxAction.type';
import AuthAction from 'types/auth/AuthAction.type';
import UserInput from 'types/auth/UserInput.type';
import AuthErrors from 'types/auth/AuthErrors.type';

const {LOGIN_PASSWORD, REGISTER_PASSWORD, GOOGLE_SIGNIN, LOGOUT} = AUTH_TYPES;
const {USERS} = FIREBASE_COLLECTIONS;

const firebaseUserAction = userActions<firebase.auth.UserCredential>();
const authFailureAction = userActions<AuthErrors>();

export default function* appSagas() {
  yield all([yield takeLatest(requestType(USER_AUTH), userAuthRequested)]);
}

function* userAuthRequested(action: ReduxAction<AuthAction>) {
  const {authType, user} = action.payload;
  yield console.log({authType, user});
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
        login: e.message,
      })
    );
  }
}

function* registerWithPassword(user: UserInput) {
  try {
    const userData: firebase.auth.UserCredential = yield call(
      registerUser,
      user.email,
      user.password
    );
    if (userData === null || userData.user === null) {
      yield put(
        authFailureAction.failure({
          register: 'Unable to register user',
        })
      );
    } else {
      const userDoc = getUserDoc(userData.user.uid);
      // yield call(userData.user.updateProfile, { displayName: user.name });
      yield call(console.log, 'User profile updated');

      yield call(
        userDoc.set,
        {labels: [], pinnedNotes: [], name: user.name},
        {merge: true}
      );
    }
  } catch (e) {
    console.log({e});
    yield put(
      authFailureAction.failure({
        register: e.message || 'Unable to register user',
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
  yield console.log(`Unsupported action called`, {action});
}
