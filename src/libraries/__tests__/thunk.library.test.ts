import Axios from 'axios';
import { TYPE_ERROR, TYPE_FETCHED } from 'src/constants';
import thunkFactory, { thunkCreator } from '../thunk.library';

const mockAxios = Axios.create();
const actionType = 'TEST_ACTION' as const;
const dispatch = jest.fn();

describe('thunk.library', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('thunkCreator', () => {
    it('should dispatch service successfully and return payload', async () => {
      const data = {
        name: 'John Doe',
      };
      const service = async () => {
        return mockAxios.get('user');
      };

      jest.spyOn(mockAxios, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await thunkCreator(actionType, service, dispatch);

      expect(result).toEqual({
        payload: {
          data,
        },
      });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenLastCalledWith({
        type: actionType,
        status: TYPE_FETCHED,
        payload: {
          data,
        },
      });
    });

    it('should dispatch error and return error data or message', async () => {
      const error = new Error('Invalid request');
      const service = async () => {
        return mockAxios.get('user');
      };

      jest
        .spyOn(mockAxios, 'get')
        .mockImplementationOnce(() => Promise.reject(error));

      const result = await thunkCreator(actionType, service, dispatch);

      expect(result).toEqual({
        error,
      });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenLastCalledWith({
        type: actionType,
        status: TYPE_ERROR,
        payload: error,
      });
    });
  });

  describe('thunkFactory', () => {
    it('should generate combined callable actions based on the async and sync functions', () => {
      const ADD_AGE = 'ADD_AGE' as const;

      const asyncList = {
        getUser: {
          type: actionType,
          service: async () => {
            return mockAxios.get('user');
          },
        },
      };

      const syncList = {
        addAge: (age: number) => ({
          type: ADD_AGE,
          payload: age,
        }),
      };

      const actions = thunkFactory(
        {
          ...asyncList,
          ...syncList,
        },
        dispatch
      );

      expect(actions.getUser).toEqual(expect.any(Function));
      expect(actions.addAge).toEqual(expect.any(Function));

      actions.getUser();
      actions.addAge(20);

      expect(dispatch).toBeCalledTimes(2);
    });
  });
});
