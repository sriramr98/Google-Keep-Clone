interface ReduxAction<T> {
  type: string;
  payload: T;
}

export default ReduxAction;
