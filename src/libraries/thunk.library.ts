import { Dispatch } from 'react';
import Axios from 'axios';
import {
  Toast,
  ToastWarning,
} from 'src/components/atoms/toaster/toaster.container';
import { TYPE_FETCHING, TYPE_ERROR, TYPE_FETCHED } from 'src/constants';
import Lang from './languages';

export const thunkCreator = async <C extends string, T>(
  actionType: C,
  service: (dispatch: Dispatch<any>) => Promise<T>,
  dispatch: Dispatch<any>,
  meta?: IMeta,
  params?: any[]
) => {
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
      params,
    });

    return { payload: response };
  } catch (error: any) {
    dispatch({
      type: actionType,
      status: TYPE_ERROR,
      payload: error.data || error,
      params,
    });

    if (!meta && error.status === 400) {
      Toast({
        id: 'http-error', // This will avoid multiple instance of http error
        header: Lang.TTL_TOAST_ERROR,
        content: Lang.formatString(
          error.data && error.data.message
            ? error.data.message
            : error.statusText || error.message,
          error.status
        ),
      });
    } else if (meta && typeof meta.error === 'function') {
      const content = meta.error(error);

      Toast({
        id: 'http-error',
        header: Lang.TTL_TOAST_ERROR,
        content:
          content ||
          Lang.formatString(
            Lang.MSG_HTTP_ERROR_BAD_REQUEST,
            error.status ?? 400
          ),
      });
    } else if (!meta || (meta && meta.error !== false)) {
      if (error instanceof Axios.Cancel) {
        ToastWarning(error.message || Lang.MSG_HTTP_ERROR_REQUEST_CANCELLED);
      } else {
        Toast({
          id: 'http-error', // This will avoid multiple instance of http error
          header: Lang.TTL_TOAST_ERROR,
          content: Lang.formatString(
            Lang.MSG_HTTP_ERROR_BAD_REQUEST,
            error.status ?? 400
          ),
        });
      }
    }

    return { error: error.data || error };
  }
};

export type IStatus = {
  error: any;
  fetching: boolean;
};

interface ICustomAction<C, P = never, S = never, A = never> {
  type: C;
  payload?: P;
  status?: S;
  params?: A;
}

export type ICommonState<T> = {
  status: {
    [K in keyof T]?: IStatus;
  };
};

export type IReturnPromise<T> = T extends Promise<infer U> ? U : T;

type IThunkReturn<T> =
  | { payload: T; error?: never }
  | { payload?: never; error: any };

type IMeta = {
  error?: boolean | ((error) => string);
};

export type IAsyncThunk = {
  type: string;
  service: (...args: any[]) => any;
  meta?: IMeta;
};

type IAsyncAction<T extends IAsyncThunk> = ICustomAction<
  T['type'],
  IReturnPromise<ReturnType<T['service']>>,
  never,
  Parameters<T['service']>
>;

export type ISyncThunk = (
  ...args: any[]
) => {
  type: string;
  payload?: any;
};

type ISyncAction<T extends ISyncThunk> = ICustomAction<
  ReturnType<T>['type'],
  ReturnType<T>['payload']
>;

// This will auto create reducer actions response
export type IReducerAction<T> = {
  [K in keyof T]: T[K] extends IAsyncThunk
    ? IAsyncAction<T[K]>
    : T[K] extends ISyncThunk
    ? ISyncAction<T[K]>
    : never;
}[keyof T];

export type IReturnActions<T> = {
  [K in keyof T]: T[K] extends IAsyncThunk
    ? (
        ...args: Parameters<T[K]['service']>
      ) => Promise<IThunkReturn<IReturnPromise<ReturnType<T[K]['service']>>>>
    : T[K] extends ISyncThunk
    ? (...args: Parameters<T[K]>) => ReturnType<T[K]>
    : never;
};

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
          dispatch,
          action.meta,
          args
        );
      },
    };
  }, {} as IReturnActions<A>);
};

export default thunkFactory;
