import axios from 'axios';
import { ValidationError } from 'yup';
import { IUser } from '../../models/user.model';
import services from '../user.service';
import { userMock } from '../mocks/user.mock';

const mockAxios = axios.create();

const userList: IUser[] = new Array(5).fill(null).map(() => userMock());

describe('Commission Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('List GET', () => {
    it('should process response data successfully', async () => {
      const data = userList;

      jest.spyOn(mockAxios, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await services.listGET();

      expect(result).toEqual(data);
    });

    it('should throw validation error if invalid type', async () => {
      jest.spyOn(mockAxios, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      await expect(services.listGET()).rejects.toThrow(ValidationError);
    });

    it('should throw validation error if invalid data', async () => {
      jest.spyOn(mockAxios, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data: [{ test: 'error' }],
        })
      );

      await expect(services.listGET()).rejects.toThrow(ValidationError);
    });
  });
});
