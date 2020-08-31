import services from '../services/user.service';
import { IUser } from '../models/user.model';
import { IAsyncActions, ISyncActions } from '../libraries/thunk.library';
import { ICommonAction, ICommonState } from '.';

export const actionTypes = {
  USER_DATA_FETCH: 'USER_DATA_FETCH',
  USER_LIST_FETCH: 'USER_LIST_FETCH',
  USER_ADD_AGE: 'USER_ADD_AGE',
} as const;

// This is where we put the actions that have promise/async payload like HTTP request
export const asyncActions = {
  dataGET: {
    type: actionTypes.USER_DATA_FETCH,
    service: services.dataGET,
  },
  listGET: {
    type: actionTypes.USER_LIST_FETCH,
    service: services.listGET,
  },
};

export type IUserAsync = typeof asyncActions;

// This is where we put the actions that doesn't have any promise/async payload
export const syncActions = {
  addAge: (age) => ({
    type: actionTypes.USER_ADD_AGE,
    payload: age,
  }),
};

export type IUserSync = typeof syncActions;

export type IUserAsyncReducerAction =
  | IAsyncActions<IUserAsync>
  | ISyncActions<IUserSync>;

export interface IUserState extends ICommonState<IUserAsyncReducerAction> {
  data?: IUser;
  list: IUser[];
}

export const defaultState: IUserState = {
  status: {},
  list: [],
};

const UserReducer = (
  state: IUserState = defaultState,
  action: ICommonAction<IUserAsyncReducerAction>
): IUserState => {
  switch (action.type) {
    case actionTypes.USER_DATA_FETCH: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case actionTypes.USER_LIST_FETCH: {
      return {
        ...state,
        list: action.payload ?? [],
      };
    }

    default: {
      return state;
    }
  }
};

export default UserReducer;
