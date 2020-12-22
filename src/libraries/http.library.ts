import Axios, { AxiosRequestConfig } from 'axios';
import { InferType, SchemaOf } from 'yup';
import { ValidateOptions } from 'yup/lib/types';

export const httpClient = () => {
  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  /* istanbul ignore next */
  const xhr = Axios.create({
    headers: { 'Content-Type': 'application/json' },
    transformRequest: [
      (data) => {
        // This is for uploading files
        if (data instanceof FormData) {
          return data;
        }

        return JSON.stringify(data);
      },
    ],
    baseURL,
  });

  /* istanbul ignore next */
  xhr.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );

  return {
    instance: xhr,

    post: async <D, S extends SchemaOf<any>, C>(
      url: string,
      data: D,
      schema: S,
      axiosConfig: AxiosRequestConfig = {},
      validateConfig: ValidateOptions<C> = {}
    ): Promise<InferType<S>> => {
      const response = await xhr.post(url, data, axiosConfig);

      return schema.validate(response.data, {
        strict: true,
        stripUnknown: true,
        ...validateConfig,
      });
    },

    get: async <D, S extends SchemaOf<any>, C>(
      url: string,
      data: D,
      schema: S,
      axiosConfig: AxiosRequestConfig = {},
      validateConfig: ValidateOptions<C> = {}
    ): Promise<InferType<S>> => {
      const response = await xhr.get(url, { ...axiosConfig, params: data });

      return schema.validate(response.data, {
        strict: true,
        stripUnknown: true,
        ...validateConfig,
      });
    },

    put: async <D, S extends SchemaOf<any>, C>(
      url: string,
      data: D,
      schema: S,
      axiosConfig: AxiosRequestConfig = {},
      validateConfig: ValidateOptions<C> = {}
    ): Promise<InferType<S>> => {
      const response = await xhr.put(url, data, axiosConfig);

      return schema.validate(response.data, {
        strict: true,
        stripUnknown: true,
        ...validateConfig,
      });
    },

    delete: async <S extends SchemaOf<any>, C>(
      url: string,
      schema: S,
      axiosConfig: AxiosRequestConfig = {},
      validateConfig: ValidateOptions<C> = {}
    ): Promise<InferType<S>> => {
      const response = await xhr.delete(url, axiosConfig);

      return schema.validate(response.data, {
        strict: true,
        stripUnknown: true,
        ...validateConfig,
      });
    },
  };
};
