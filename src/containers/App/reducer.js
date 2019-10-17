import {INCREMENT, DECREMENT, USER_AUTH} from './actionTypes';
import {
  commonInitialState,
  requestType,
  successType,
  failureType,
  clearType,
} from 'utils/redux';

const initialState = {
  value: 0,
  currentUser: commonInitialState,
};

export default (state = initialState, action) => {
  const {type: actionType, payload: actionPayload} = action;
  switch (actionType) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1,
      };
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
