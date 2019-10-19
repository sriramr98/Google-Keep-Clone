import ReduxAction from 'types/auth/ReduxAction.type';
import ApiActions from 'types/common/ApiActions.type';
import CommonReduxState from 'types/common/CommonReduxState.type';

export const commonInitialState: CommonReduxState = {
  isFetching: false,
  finished: false,
  error: null,
  data: null,
  meta: null,
};

export const createActionCreator = (type: string) => <T>(
  payload?: T
): ReduxAction<T> => ({ type, payload: payload! });

export const requestType = (constants: string) => `${constants}/REQUEST`;
export const successType = (constants: string) => `${constants}/SUCCESS`;
export const failureType = (constants: string) => `${constants}/FAILURE`;
export const clearType = (constants: string) => `${constants}/CLEAR`;

export const createApiActions = <T>(constants: string): ApiActions<T> => {
  const request = createActionCreator(requestType(constants));
  const success = createActionCreator(successType(constants));
  const failure = createActionCreator(failureType(constants));
  const clear = createActionCreator(clearType(constants));
  return {
    request,
    success,
    failure,
    clear,
  };
};