import Axios, { AxiosRequestConfig } from 'axios';
import { Schema, InferType } from 'yup';

export const httpClient = () => {
  const xhr = Axios.create();

  return {
    post: async <D, S extends Schema<any>>(
      url: string,
      data: D,
      schema: S,
      config?: AxiosRequestConfig
    ): Promise<InferType<S>> => {
      const response = await xhr.post(url, data, config);

      return schema.validate(response.data, {
        stripUnknown: true,
      });
    },

    get: async <D, S extends Schema<any>>(
      url: string,
      data: D,
      schema: S,
      config?: AxiosRequestConfig
    ): Promise<InferType<S>> => {
      const response = await xhr.get(url, { ...config, params: data });

      return schema.validate(response.data, {
        stripUnknown: true,
      });
    },

    put: async <D, S extends Schema<any>>(
      url: string,
      data: D,
      schema: S,
      config?: AxiosRequestConfig
    ): Promise<InferType<S>> => {
      const response = await xhr.put(url, data, config);

      return schema.validate(response.data, {
        stripUnknown: true,
      });
    },

    delete: async <D, S extends Schema<any>>(
      url: string,
      data: D,
      schema: S
    ): Promise<InferType<S>> => {
      const response = await xhr.delete(url, data);

      return schema.validate(response.data, {
        stripUnknown: true,
      });
    },
  };
};
