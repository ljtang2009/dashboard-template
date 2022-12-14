import axios from 'axios';
import { createDiscreteApi } from 'naive-ui';

const { message } = createDiscreteApi(['message', 'dialog']);

export interface requestOptions {
  /**
   * 是否定制错误
   */
  isCustomError?: boolean;
}

interface requestParams {
  method?: 'post' | 'get';
  url: string;
  data?: object;
  options?: requestOptions;
}

function handleError(errorMessage: string) {
  message.error(errorMessage, {
    duration: 0,
    closable: true,
  });
}

const instance = axios.create({
  timeout: 60 * 1000,
});

export function request(params: requestParams) {
  return new Promise((resolve, reject) => {
    const axiosParams = {
      method: params.method ? (params.method as string) : 'post',
      url: params.url,
      data: params.data,
    };
    instance
      .request(axiosParams)
      .then((response) => {
        const _data = response.data;
        if (_data.code === 200) {
          resolve(_data.data);
        } else {
          reject(_data);
          if (!params.options || !params.options.isCustomError) {
            handleError(_data.message);
          }
        }
      })
      .catch((error) => {
        reject(error);
        if (!params.options || !params.options.isCustomError) {
          handleError(error.message);
        }
      });
  });
}
