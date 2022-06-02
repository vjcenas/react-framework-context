---
to: src/services/__tests__/<%= h.changeCase.paramCase(name) %>.service.test.ts
---

import axios from 'axios';
import { ValidationError } from 'yup';
import { <%= h.changeCase.camel(name) %>Mock } from 'src/models/mocks/<%= h.changeCase.paramCase(name) %>.mock';
import services from '../<%= h.changeCase.paramCase(name) %>.service';

const mockAxios = axios.create();

const <%= h.changeCase.camel(name) %>List = Array(10)
  .fill(null)
  .map(() => <%= h.changeCase.camel(name) %>Mock());

describe('<%= h.changeCase.pascal(name) %> Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Data GET', () => {
    const <%= h.changeCase.camel(name) %> = <%= h.changeCase.camel(name) %>Mock();

    it('should process response data successfully', async () => {
      jest.spyOn(mockAxios, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            <%= h.changeCase.camel(name) %>,
          },
        })
      );

      const result = await services.dataGET(<%= h.changeCase.camel(name) %>.id);

      expect(result).toEqual({
        <%= h.changeCase.camel(name) %>,
      });
    });

    it('should throw ValidationError', async () => {
      jest.spyOn(mockAxios, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      await expect(services.dataGET(<%= h.changeCase.camel(name) %>.id)).rejects.toThrow(ValidationError);
    });
  });

  describe('List GET', () => {
    it('should process response data successfully', async () => {
      const data = {
        count: <%= h.changeCase.camel(name) %>List.length,
        rows: <%= h.changeCase.camel(name) %>List,
      };

      jest.spyOn(mockAxios, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await services.listGET();

      expect(result).toEqual(data);
    });

    it('should throw ValidationError', async () => {
      jest.spyOn(mockAxios, 'get').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      await expect(services.listGET()).rejects.toThrow(ValidationError);
    });
  });

  describe('Create POST', () => {
    const <%= h.changeCase.camel(name) %> = <%= h.changeCase.camel(name) %>Mock();

    it('should process response data successfully', async () => {
      const data = {
        <%= h.changeCase.camel(name) %>,
      };

      jest.spyOn(mockAxios, 'post').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await services.createPOST({
        name: <%= h.changeCase.camel(name) %>.name,
        createdBy: <%= h.changeCase.camel(name) %>.createdBy,
        updatedBy: <%= h.changeCase.camel(name) %>.updatedBy,
      });

      expect(result).toEqual(data);
    });

    it('should throw ValidationError', async () => {
      jest.spyOn(mockAxios, 'post').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      await expect(
        services.createPOST({
          name: <%= h.changeCase.camel(name) %>.name,
          createdBy: <%= h.changeCase.camel(name) %>.createdBy,
          updatedBy: <%= h.changeCase.camel(name) %>.updatedBy,
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Update PUT', () => {
    const <%= h.changeCase.camel(name) %> = <%= h.changeCase.camel(name) %>Mock();

    it('should process response data successfully', async () => {
      const data = {
        <%= h.changeCase.camel(name) %>,
      };

      jest.spyOn(mockAxios, 'put').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await services.updatePUT(1, {
        name: <%= h.changeCase.camel(name) %>.name,
        createdBy: <%= h.changeCase.camel(name) %>.createdBy,
        updatedBy: <%= h.changeCase.camel(name) %>.updatedBy,
      });

      expect(result).toEqual(data);
    });

    it('should throw ValidationError', async () => {
      jest.spyOn(mockAxios, 'put').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      await expect(
        services.updatePUT(1, {
          name: <%= h.changeCase.camel(name) %>.name,
          createdBy: <%= h.changeCase.camel(name) %>.createdBy,
          updatedBy: <%= h.changeCase.camel(name) %>.updatedBy,
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Data DELETE', () => {
    it('should process response data successfully', async () => {
      const data = {
        success: true,
      };

      jest.spyOn(mockAxios, 'delete').mockImplementationOnce(() =>
        Promise.resolve({
          data,
        })
      );

      const result = await services.dataDELETE(<%= h.changeCase.camel(name) %>Mock().id);

      expect(result).toEqual(data);
    });

    it('should throw ValidationError', async () => {
      jest.spyOn(mockAxios, 'delete').mockImplementationOnce(() =>
        Promise.resolve({
          data: { test: 'error' },
        })
      );

      const result = services.dataDELETE(<%= h.changeCase.camel(name) %>Mock().id);

      await expect(result).rejects.toThrow(ValidationError);
    });

    it('should throw TypeError', async () => {
      jest
        .spyOn(mockAxios, 'delete')
        .mockImplementationOnce(() => Promise.resolve(null));

      const result = services.dataDELETE(<%= h.changeCase.camel(name) %>Mock().id);

      await expect(result).rejects.toThrow(TypeError);
    });
  });
});
