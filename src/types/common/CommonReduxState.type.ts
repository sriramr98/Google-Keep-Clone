import AuthErrors from 'types/auth/AuthErrors.type';

interface CommonReduxState {
  isFetching: boolean;
  finished: boolean;
  error: AuthErrors | null;
  data: object | null;
  meta: object | null;
}

export default CommonReduxState;
