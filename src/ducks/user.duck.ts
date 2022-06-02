import { ICommonState, IReducerAction } from 'src/libraries/thunk.library';
import services from 'src/services/user.service';
import { IUser } from 'src/models/user.model';

export const userActionTypes = {
  USER_DATA_READ: 'USER_DATA_READ',
  USER_LIST_READ: 'USER_LIST_READ',
  USER_DATA_CREATE: 'USER_DATA_CREATE',
  USER_DATA_UPDATE: 'USER_DATA_UPDATE',
  USER_DATA_DELETE: 'USER_DATA_DELETE',
  USER_DATA_SET: 'USER_DATA_SET',
  USER_ADD_AGE: 'USER_ADD_AGE',
} as const;

export const duckActions = {
  dataGET: {
    type: userActionTypes.USER_DATA_READ,
    service: services.dataGET,
  },
  listGET: {
    type: userActionTypes.USER_LIST_READ,
    service: services.listGET,
  },

  addAge: (age: number) => ({
    type: userActionTypes.USER_ADD_AGE,
    payload: age,
  }),

  // This is a sync action
  setData: (user: IUser) => ({
    type: userActionTypes.USER_DATA_SET,
    payload: {
      user,
    },
  }),
};

export type IUserAsync = typeof duckActions;

export interface IUserState extends ICommonState<typeof userActionTypes> {
  data?: IUser;
  list: IUser[];
  total: number;
}

export const defaultState: IUserState = {
  status: {},
  list: [],
  total: 0,
};

const UserReducer = (
  state: IUserState,
  action: IReducerAction<IUserAsync>
): IUserState => {
  switch (action.type) {
    case userActionTypes.USER_DATA_SET:
    case userActionTypes.USER_DATA_READ:
    case userActionTypes.USER_DATA_UPDATE:
    case userActionTypes.USER_DATA_CREATE: {
      return {
        ...state,
        data: action.payload?.user,
      };
    }

    case userActionTypes.USER_LIST_READ: {
      return {
        ...state,
        list: action.payload?.rows ?? [],
        total: action.payload?.count ?? 0,
      };
    }

    case userActionTypes.USER_DATA_DELETE: {
      if (action.params) {
        const [id] = action.params;
        const list = state.list.filter((value) => value.userId !== id);

        return {
          ...state,
          data: undefined,
          total: state.total - (state.list.length - list.length),
          list,
        };
      }

      return state;
    }

    case userActionTypes.USER_ADD_AGE: {
        return {
          ...state,
          data: {
            ...(state.data as IUser),
            age: Number(state.data?.age ?? 0) + Number(action.payload),
          },
        };
      }

    default: {
      return state;
    }
  }
};

export default UserReducer;
