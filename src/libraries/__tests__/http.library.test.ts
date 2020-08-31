import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { IUser } from 'src/models/user.model';
import { userMock } from 'src/services/mocks/user.mock';
import { ValidationError } from 'yup';
import { isString } from 'util';
import yup from '../validator.library';
import { httpClient } from '../http.library';

const mockAxios = axios.create();
const client = httpClient();

const user: IUser = userMock();
const userList: IUser[] = new Array(5).fill(null).map(() => userMock());

describe('HTTP Library', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('POST', () => {
    it('should process response data successfully', async () => {
      const data = userList;

      mocked(mockAxios.post).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await client.post('/user', data, yup.mixed());

      expect(result).toEqual(data);
    });

    it('should process response FormData successfully', async () => {
      const data = user;

      mocked(mockAxios.post).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const formData = new FormData();

      Object.entries(data).map(([key, value]) => {
        if (isString(value)) {
          formData.append(key, value);
        }
      });

      const result = await client.post('/user', formData, yup.mixed());

      expect(result).toEqual(data);
    });

    it('should throw validation error if invalid type', async () => {
      mocked(mockAxios.post).mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      const result = client.post('/user', {}, yup.array().of(yup.string()));

      await expect(result).rejects.toThrow(ValidationError);
    });
  });

  describe('GET', () => {
    it('should process response data successfully', async () => {
      const data = userList;

      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await client.get('/user', {}, yup.mixed());

      expect(result).toEqual(data);
    });

    it('should throw validation error if invalid type', async () => {
      mocked(mockAxios.get).mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      const result = client.get('/user', {}, yup.array().of(yup.string()));

      await expect(result).rejects.toThrow(ValidationError);
    });
  });

  describe('PUT', () => {
    it('should process response data successfully', async () => {
      const data = user;

      mocked(mockAxios.put).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await client.put('/user', data, yup.mixed());

      expect(result).toEqual(data);
    });

    it('should throw validation error if invalid type', async () => {
      mocked(mockAxios.put).mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      const result = client.put('/user', {}, yup.array().of(yup.string()));

      await expect(result).rejects.toThrow(ValidationError);
    });
  });

  describe('DELETE', () => {
    it('should process response data successfully', async () => {
      const data = user;

      mocked(mockAxios.delete).mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await client.delete('/user/1', yup.mixed());

      expect(result).toEqual(data);
    });

    it('should throw validation error if invalid type', async () => {
      mocked(mockAxios.delete).mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      const result = client.delete('/user', yup.array().of(yup.string()));

      await expect(result).rejects.toThrow(ValidationError);
    });
  });
});
