import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { call, cancelled } from 'redux-saga/effects';
import { defaultHeaders, baseURL } from './constants';
import { ApiError } from './ApiError';

export const instance = axios.create({
  headers: defaultHeaders,
  baseURL
});

instance.interceptors.response.use(undefined, async (error: AxiosError) => {
  // If the app can't reach the backend or it returns an HTTP 5xx error - classify this error as a transport error
  if (!error.response || error.response.status >= 500) {
    throw new ApiError(error.message, true);
  }

  throw new ApiError(error.message);
});

function* sagaRequest(config: AxiosRequestConfig, returnData: boolean) {
  const cancel = axios.CancelToken.source();
  config.cancelToken = cancel.token;

  try {
    const response: AxiosResponse = yield call([instance, instance.request], config);

    return returnData ? response.data : response;
  } finally {
    if (yield cancelled()) {
      cancel.cancel();
    }
  }
}

export default {
  request: (config: AxiosRequestConfig) => sagaRequest(config, false),
  get: (url: string, config: AxiosRequestConfig = {}) => sagaRequest({ ...config, method: 'get', url }, true),
  post: (url: string, data?: any, config: AxiosRequestConfig = {}) =>
    sagaRequest({ ...config, method: 'post', url, data }, true),
};
