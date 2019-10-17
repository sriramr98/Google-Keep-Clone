export const commonInitialState = {
  isFetching: false,
  finished: false,
  error: null,
  data: null,
  meta: null,
};

export const createActionCreator = type => payload => ({type, payload});

export const requestType = constants => `${constants}/REQUEST`;
export const successType = constants => `${constants}/SUCCESS`;
export const failureType = constants => `${constants}/FAILURE`;
export const clearType = constants => `${constants}/CLEAR`;

export const createApiActions = constants => {
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

export const updateCommonState = (state, action, constant) => {
  const {type, payload: data} = action;
  if (type === requestType(constant))
    return {
      ...state,
      isFetching: true,
      data: null,
      error: null,
    };
  if (type === successType(constant))
    return {
      ...state,
      isFetching: false,
      data,
      finished: true,
    };
  if (type === failureType(constant)) {
    return {
      ...state,
      isFetching: false,
      finished: true,
      error: data,
    };
  }
  if (type === clearType(constant)) {
    return {
      ...state,
      isFetching: false,
      finished: false,
      data: null,
      error: null,
    };
  }
  return state;
};
