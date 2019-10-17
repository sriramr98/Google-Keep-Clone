import {INCREMENT, DECREMENT, USER_AUTH} from './actionTypes';
import {createApiActions} from 'utils/redux';

export const incrementValue = () => ({
  type: INCREMENT,
});

export const decrementValue = () => ({
  type: DECREMENT,
});

export const userActions = createApiActions(USER_AUTH);
