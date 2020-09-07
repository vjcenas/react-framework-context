import { IUser, UserSchema, UserListSchema } from 'src/models/user.model';
import { userMock } from 'src/services/mocks/user.mock';
import { ValidationError } from 'yup';
import { isString } from 'util';
import { httpClient } from '../http.library';

const client = httpClient();

const user: IUser = userMock();
const userList: IUser[] = new Array(5).fill(null).map(() => userMock());

describe('HTTP Library', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('POST', () => {
    it('should process response data successfully', async () => {
      const data = userList[0];

      jest.spyOn(client.instance, 'post').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await client.post('/user', data, UserSchema);

      expect(result).toEqual(data);
    });

    it('should process FormData request successfully', async () => {
      const data = user;

      jest.spyOn(client.instance, 'post').mockImplementationOnce(() =>
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

      const result = await client.post('/user', formData, UserSchema);

      expect(result).toEqual(data);
    });

    it('should throw ValidationError', async () => {
      jest.spyOn(client.instance, 'post').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      const result = client.post('/user', {}, UserSchema);

      await expect(result).rejects.toThrow(ValidationError);
    });

    it('should throw TypeError', async () => {
      jest
        .spyOn(client.instance, 'post')
        .mockImplementationOnce(() => Promise.resolve(null));

      const result = client.post(
        '/user',
        {},
        UserSchema,
        {
          headers: {
            Autorization: 'Bearer Test',
          },
        },
        {
          strict: true,
        }
      );

      await expect(result).rejects.toThrow(TypeError);
    });
  });

  describe('GET', () => {
    it('should process response data successfully', async () => {
      const data = userList;

      jest.spyOn(client.instance, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await client.get('/user', {}, UserListSchema);

      expect(result).toEqual(data);
    });

    it('should throw ValidationError', async () => {
      jest.spyOn(client.instance, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      const result = client.get('/user', {}, UserListSchema);

      await expect(result).rejects.toThrow(ValidationError);
    });

    it('should throw TypeError', async () => {
      jest
        .spyOn(client.instance, 'get')
        .mockImplementationOnce(() => Promise.resolve(null));

      const result = client.get(
        '/user',
        {},
        UserListSchema,
        {
          headers: {
            Autorization: 'Bearer Test',
          },
        },
        {
          strict: true,
        }
      );

      await expect(result).rejects.toThrow(TypeError);
    });
  });

  describe('PUT', () => {
    it('should process response data successfully', async () => {
      const data = user;

      jest.spyOn(client.instance, 'put').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await client.put('/user/1', data, UserSchema);

      expect(result).toEqual(data);
    });

    it('should process FormData request successfully', async () => {
      const data = user;

      jest.spyOn(client.instance, 'put').mockImplementationOnce(() =>
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

      const result = await client.put('/user/1', formData, UserSchema);

      expect(result).toEqual(data);
    });

    it('should throw ValidationError', async () => {
      jest.spyOn(client.instance, 'put').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      const result = client.put('/user/1', {}, UserSchema);

      await expect(result).rejects.toThrow(ValidationError);
    });

    it('should throw TypeError', async () => {
      jest
        .spyOn(client.instance, 'put')
        .mockImplementationOnce(() => Promise.resolve(null));

      const result = client.put(
        '/user/1',
        {},
        UserSchema,
        {
          headers: {
            Autorization: 'Bearer Test',
          },
        },
        {
          strict: true,
        }
      );

      await expect(result).rejects.toThrow(TypeError);
    });
  });

  describe('DELETE', () => {
    it('should process response data successfully', async () => {
      const data = user;

      jest.spyOn(client.instance, 'delete').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await client.delete('/user/1', UserSchema);

      expect(result).toEqual(data);
    });

    it('should throw ValidationError', async () => {
      jest.spyOn(client.instance, 'delete').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      const result = client.delete('/user/1', UserSchema);

      await expect(result).rejects.toThrow(ValidationError);
    });

    it('should throw TypeError', async () => {
      jest
        .spyOn(client.instance, 'delete')
        .mockImplementationOnce(() => Promise.resolve(null));

      const result = client.delete(
        '/user/1',
        UserSchema,
        {
          headers: {
            Autorization: 'Bearer Test',
          },
        },
        {
          strict: true,
        }
      );

      await expect(result).rejects.toThrow(TypeError);
    });
  });
});
