import { Dispatch } from 'react';
import { TYPE_FETCHING, TYPE_ERROR, TYPE_FETCHED } from 'src/constants';

type IStatus = {
  error: any;
  fetching: boolean;
};

type ICustomAction<T, P = never, S = never> = {
  type: T;
  payload: P;
  status: S;
};

export type ICommonState<T> = {
  status: {
    [K in keyof T]?: IStatus;
  };
};

type IReturnPromise<T> = T extends Promise<infer U> ? U : T;

type IThunkReturn<T> =
  | { payload: T; error?: never }
  | { payload?: never; error: any };

export const thunkCreator = async <
  A extends string,
  T,
  D extends Dispatch<any>
>(
  actionType: A,
  service: (dispatch: D) => Promise<T>,
  dispatch: D
): Promise<IThunkReturn<T>> => {
  dispatch({
    type: actionType,
    status: TYPE_FETCHING,
  });

  try {
    const response = await service(dispatch);
    dispatch({
      type: actionType,
      status: TYPE_FETCHED,
      payload: response,
    });

    return { payload: response };
  } catch (error) {
    dispatch({
      type: actionType,
      status: TYPE_ERROR,
      payload: error.data || error,
    });

    return { error: error.data || error };
  }
};

type IMeta = {
  error?: boolean | ((error) => string);
};

export type IAsyncThunk = Record<
  string,
  {
    type: string;
    service: (...args: any[]) => any;
    meta?: IMeta;
  }
>;

type IAsyncAction<T extends IAsyncThunk[string]> = ICustomAction<
  T['type'],
  IReturnPromise<ReturnType<T['service']>>
>;

type IAsyncActionReturn<T extends IAsyncThunk> = {
  [K in keyof T]: (
    ...args: Parameters<T[K]['service']>
  ) => Promise<IThunkReturn<IReturnPromise<ReturnType<T[K]['service']>>>>;
};

export type ISyncThunk = Record<
  string,
  (
    ...args: any[]
  ) => {
    type: string;
    payload?: any;
  }
>;

type ISyncAction<T extends ISyncThunk[string]> = ICustomAction<
  ReturnType<T>['type'],
  ReturnType<T>['payload']
>;

type ISyncActionReturn<T extends ISyncThunk> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<T[K]>;
};

// This will auto create reducer actions response
export type IReducerAction<T> = {
  [K in keyof T]: T[K] extends IAsyncThunk[string]
    ? IAsyncAction<T[K]>
    : T[K] extends ISyncThunk[string]
    ? ISyncAction<T[K]>
    : IAsyncAction<IAsyncThunk[string]> & ISyncAction<ISyncThunk[string]>;
}[keyof T];

type IHybridActionReturn<T> = {
  [K in keyof T]: T[K] extends IAsyncThunk[string]
    ? (
        ...args: Parameters<T[K]['service']>
      ) => Promise<IThunkReturn<IReturnPromise<ReturnType<T[K]['service']>>>>
    : T[K] extends ISyncThunk[string]
    ? (...args: Parameters<T[K]>) => ReturnType<T[K]>
    : never;
};

export type IReturnActions<T> = T extends IAsyncThunk
  ? IAsyncActionReturn<T>
  : T extends ISyncThunk
  ? ISyncActionReturn<T>
  : IHybridActionReturn<T>;

const thunkFactory = <A, R>(actions: A, dispatch: Dispatch<R>) => {
  return Object.keys(actions).reduce((thunks, key) => {
    const action = actions[key];

    return {
      ...thunks,
      [key]: (...args) => {
        if (typeof action === 'function') {
          return dispatch(action(...args));
        }
        return thunkCreator(
          action.type,
          () => action.service(...args),
          dispatch
        );
      },
    };
  }, {} as IReturnActions<A>);
};

export default thunkFactory;
