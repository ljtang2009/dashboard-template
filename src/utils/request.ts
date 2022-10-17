import axios, { AxiosError } from 'axios';
import { createDiscreteApi } from 'naive-ui';

const isProd = process.env['NODE_ENV'] === 'production';

const { message, dialog } = createDiscreteApi(['message', 'dialog']);

interface requestParams {
  method?: 'post' | 'get';
  url: string;
  data?: object;
  /**
   * 是否定制错误
   */
  isCustomError?: boolean;
}

function handleError(error: AxiosError) {
  // 显示默认错误
  if (error.response) {
    const title = `${error.response.status} ${error.response.statusText}`;
    if (isProd) {
      // TODO 记录log
      message.error(title, {
        duration: 0,
        closable: true,
      });
    } else {
      dialog.create({
        type: 'error',
        title,
        content: JSON.stringify(error.response.data),
      });
    }
  } else {
    message.error(error.message, {
      duration: 0,
      closable: true,
    });
  }
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
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
        if (!params.isCustomError) {
          // 显示默认错误
          handleError(error);
        }
      });
  });
}
