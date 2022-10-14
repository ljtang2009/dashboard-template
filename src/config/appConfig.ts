import appConfig from '@/config/appConfig.json';

const isProd = process.env['NODE_ENV'] === 'production';

export const getAppConfig = (): Record<string, any> => {
  let result = window.appConfig;
  if (isProd) {
    result = appConfig;
    // TODO 考虑生产环境，用户也有自定义界面的需求
  }
  return result;
};
