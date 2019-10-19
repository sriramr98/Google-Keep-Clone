import { Reducer } from 'redux';
import { INCREMENT, DECREMENT, USER_AUTH } from './actionTypes';
import {
  commonInitialState,
  requestType,
  successType,
  failureType,
  clearType,
} from 'utils/redux';
import State from 'types/State.type';

const initialState = {
  currentUser: commonInitialState,
};

const appReducer: Reducer<State> = (state = initialState, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case requestType(USER_AUTH):
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isFetching: true,
          finished: false,
          data: null,
          error: null,
        },
      };
    case successType(USER_AUTH): {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isFetching: false,
          finished: true,
          data: actionPayload,
          error: null,
        },
      };
    }
    case failureType(USER_AUTH): {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isFetching: false,
          finished: true,
          data: null,
          error: actionPayload,
        },
      };
    }
    case clearType(USER_AUTH): {
      return {
        ...state,
        currentUser: {
          ...commonInitialState,
        },
      };
    }
    default:
      return state;
  }
};

export default appReducer;