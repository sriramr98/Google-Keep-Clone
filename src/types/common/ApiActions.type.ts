import ReduxAction from 'types/auth/ReduxAction.type';

interface ApiActions<T> {
  request: (payload: T) => ReduxAction<T>;
  success: (payload: T) => ReduxAction<T>;
  failure: (payload: T) => ReduxAction<T>;
  clear: () => ReduxAction<T>;
}

export default ApiActions;
